const jwt = require('jwt-simple');
const jwtConfig = require('../config/jwt-config');

function decodeToken(token) {
  jwt.decode(token, jwtConfig.jwtSecret);
}

module.exports = {
  decodeToken,
};
