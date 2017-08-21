const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./../api/users/user.model');
const jwtConfig = require('./../config/jwt-config');

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

function authConfig() {
  const params = {
    secretOrKey: jwtConfig.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
  };

  const strategy = new Strategy(params, (payload, done) => {
    return User.findOne({ _id: payload.id }).exec()
      .then(user => done(null, user))
      .catch(() => done(new Error('User not found', null)));
  });

  passport.use(strategy);
  return ({
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', jwtConfig.jwtSession),
  });
}

module.exports = authConfig;

