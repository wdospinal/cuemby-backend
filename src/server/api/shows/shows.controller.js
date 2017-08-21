const got = require('got');
const { database } = require('../../config/database');

const baseShowsUrl = 'http://api.tvmaze.com/shows';

function respondWithError(res, code) {
  const statusCode = code || 500;
  return err => res.status(statusCode).send(err);
}

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (result) => {
    if (result) {
      res.status(statusCode).json(result);
    }
  };
}

function saveShows(body) {
  const showList = JSON.parse(body);
  const updates = {};
  for (let i = 0; i < 40; i += 1) {
    updates[`/shows/${showList[i].id}`] = showList[i];
  }
  /*
  showList.forEach((show) => {
     updates[`/shows/${show.id}`] = show];
  });
  */
  return database.ref().update(updates);
}

function getShows(req, res) {
  const url = baseShowsUrl;
  return got(url)
    .then(response => saveShows(response.body))
    .then(respondWithResult(res))
    .catch(respondWithError(res));
}

function addFavorite(req, res) {
  const show = req.body;
  const updates = {};
  const email = req.user.email.replace(/[.]/g, '-');
  updates[`/favorites/${email}/${show.id}`] = show.name;
  database.ref().update(updates)
    .then(respondWithResult(res))
    .catch(respondWithError(res));
}

function addComment(req, res) {
  const show = req.body.show;
  const email = req.user.email.replace(/[.]/g, '-');
  const comment = { author: email, comment: req.body.comment };
  const updates = {};
  const key = database.ref().child(`/comments/${show.id}/`).push().key;

  updates[`/comments/${show.id}/${key}`] = comment;
  database.ref().update(updates)
    .then(respondWithResult(res))
    .catch(respondWithError(res));
}

function addLike(req, res) {
  const show = req.body;
  const updates = {};
  const ref = database.ref(`/shows/${show.id}`);
  ref.once('value', (showSnap) => {
    const likes = showSnap.val().likes ? showSnap.val().likes + 1 : 1;
    updates[`/shows/${show.id}/likes/`] = likes;
    database.ref().update(updates)
      .then(respondWithResult(res))
      .catch(respondWithError(res));
  }, (errorObject) => {
    respondWithError(res)(errorObject);
  });
}

module.exports = {
  getShows,
  addFavorite,
  addComment,
  addLike,
};
