/* eslint-disable no-lonely-if */
/* eslint-disable no-buffer-constructor */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(() => {
  console.log('Connected correctly to the server');
}, (err) => { console.log(err); });
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRoutes');
const dishRouterById = require('./routes/dishRoutesById');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('123456'));// secret key for cookies
// basic authentication
function auth(req, res, next) {
  console.log(req.signedCookies);
  if (!req.signedCookies.user) {
    // заставляем авторизироваться,если его нет
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error('You are not authentificated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
    const authorizationData = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = authorizationData[0];
    const password = authorizationData[1];

    if (username === 'admin' && password === 'password') {
      // добавляем куки
      res.cookie('user', 'admin', { signed: true });
      next();
    } else {
      const err = new Error('You are not authentificated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else if (req.signedCookies.user === 'admin') {
    next();
  } else {
    const err = new Error('You are not authentificated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
  }
}
app.use(auth); // authentication

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/dishes', dishRouterById);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
