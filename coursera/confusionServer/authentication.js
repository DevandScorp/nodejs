/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook-token');
const User = require('./models/user');
const config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.facebookPassport = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!err && user !== null) {
      return done(null, user);
    }
    user = new User({ username: profile.displayName });
    user.facebookId = profile.id;
    user.firstname = profile.name.givenName;
    user.lastname = profile.name.familyName;
    user.save((error, userCreated) => {
      if (error) {
        return done(error, false);
      }
      return done(null, userCreated);
    });
  });
}));
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
