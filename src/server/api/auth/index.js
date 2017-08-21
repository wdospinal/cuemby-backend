const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/local', controller.create);

module.exports = router;
