/* eslint-disable prefer-destructuring */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');

const config = require('./config');

const options = {};
// как достаем токен из request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;
// expiresIn - сколько держится json

passport.use('admin-jwt', new JwtStrategy(options,
  (JWTPayload, done) => {
    console.log('JWT payload: ', JWTPayload);
    console.log('________________________________________');
    User.findOne({ _id: JWTPayload._id, admin: true }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  }));
// определил способ аутентификации без сессий
exports.verifyAdmin = passport.authenticate('admin-jwt', { session: false });
