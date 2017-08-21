const User = require('./../users/user.model');
const jwt = require('jwt-simple');
const jwtConfig = require('./../../config/jwt-config');

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (result) => {
    if (result) {
      return res.status(statusCode).json(result);
    }
    return res.sendStatus(statusCode);
  };
}

function respondWithError(res, code) {
  const statusCode = code || 500;
  return err => res.status(statusCode).send(err);
}

function signToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
  };
  return { token: jwt.encode(payload, jwtConfig.jwtSecret) };
}

function processUser(user, password, res) {
  if (user) {
    const isValid = user.verifyPassword(password);
    if (isValid) {
      return respondWithResult(res, 201)(signToken(user));
    }
    return respondWithError(res, 401)('Invalid password');
  }
  return respondWithError(res, 404)('User not found');
}

function create(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }).exec()
    .then(user => processUser(user, password, res))
    .catch(respondWithError(res));
}

module.exports = {
  create,
};
