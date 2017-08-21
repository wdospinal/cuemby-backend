const express = require('express');
const passport = require('passport');
const controller = require('./user.controller');

const router = express.Router();
router.post('/', controller.create);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteUser);

module.exports = router;
