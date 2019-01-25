/* eslint-disable prefer-destructuring */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = user => jwt.sign(user, config.secretKey,
  { expiresIn: 3600 });

const options = {};
// как достаем токен из request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;
// expiresIn - сколько держится json

passport.use(new JwtStrategy(options,
  (JWTPayload, done) => {
    console.log('JWT payload: ', JWTPayload);
    console.log('________________________________________');
    User.findOne({ _id: JWTPayload._id }, (err, user) => {
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
exports.verifyUser = passport.authenticate('jwt', { session: false });
