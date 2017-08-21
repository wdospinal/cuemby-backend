const express = require('express');
const passport = require('passport');
const { getShows, addFavorite, addComment, addLike } = require('./shows.controller');

const router = express.Router();

router.post('/', getShows);
router.post('/favorite', passport.authenticate('jwt', { session: false }), addFavorite);
router.post('/comment', passport.authenticate('jwt', { session: false }), addComment);
router.post('/like', passport.authenticate('jwt', { session: false }), addLike);

module.exports = router;
