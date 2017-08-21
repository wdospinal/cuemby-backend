const bodyParser = require('body-parser');
const auth = require('./auth')();

function config(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(auth.initialize());
}

module.exports = config;
