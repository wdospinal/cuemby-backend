const User = require('./user.model');
const bcrypt = require('bcryptjs');
const { decodeToken } = require('../../helpers/tokenHelper');

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (result) => {
    if (result) {
      return res.status(statusCode).json(result);
    }
    return res.status(statusCode).end();
  };
}

function respondWithError(res, code) {
  const statusCode = code || 500;
  return err => res.status(statusCode).send(err);
}

function create(req, res) {
  const { email, password, alias, role } = req.body;
  User.create({ email, password, alias, role })
    .then(respondWithResult(res))
    .catch(respondWithError(res));
}

function getAll(req, res) {
  if (req.user.role === 'admin') {
    User.find({}).exec()
      .then(respondWithResult(res))
      .catch(respondWithError(res));
  } else {
    return respondWithError(res, 401)('Only admin role is allowed to do this action.');
  }
}

function getById(req, res) {
  const id = req.params.id;
  if (req.user.role === 'admin') {
    User.find({ _id: id })
      .then(respondWithResult(res))
      .catch(respondWithError(res, 404));
  } else {
    return respondWithError(res, 401)('Only admin role is allowed to do this action.');
  }
}

function update(req, res) {
  const id = req.params.id;
  const { email, password, alias, role } = req.body;
  const newReg = password ? {
    email,
    password: bcrypt.hashSync(password, 10),
    alias,
    role,
  } : { email, alias, role };

  if (req.user.role === 'admin') {
    User.update({ _id: id }, newReg).exec()
      .then(respondWithResult(res))
      .catch((r) => {
        console.log(r);
        return respondWithError(res)(r);
      });
  } else {
    return respondWithError(res, 401)('Only admin role is allowed to do this action.');
  }
}

function deleteUser(req, res) {
  const id = req.params.id;
  if (req.user.role === 'admin') {
    User.remove({ _id: id })
      .then(respondWithResult(res))
      .catch(respondWithError(res));
  } else {
    return respondWithError(res, 401)('Only admin role is allowed to do this action.');
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteUser,
};
