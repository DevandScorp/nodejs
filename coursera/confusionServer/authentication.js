const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.local = passport.use(new LocalStrategy(User.authenticate()));
