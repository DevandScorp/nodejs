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
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const Dishes = require('./models/dishes');
const config = require('./config');

const url = config.mongoUrl;

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(() => {
  console.log('Connected correctly to the server');
}, (err) => { console.log(err); });
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRoutes');
const dishRouterById = require('./routes/dishRoutesById');
const promotionRouter = require('./routes/promotionsRoutes');
const uploadRouter = require('./routes/uploadRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// session сам работает с кукисами
// с помощью fileStore ты создаешь файлы с кукисами
app.use(passport.initialize());
// app.use(cookieParser('123456'));// secret key for cookies
// basic authentication
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/dishes', dishRouterById);
app.use('/imageUpload', uploadRouter);
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
