const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const mysql = require('mysql');
const methodOverride = require('method-override')
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin')

const app = express();

dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware de aplicación, para usar delete y put
app.use(cors())
app.use(methodOverride('_method'));

//URL encode  - para usar req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Sexopata420",
  resave: false,
  saveUninitialized: false
}))
//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
//connect MongoDb

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected 😎 ⚡"))
  .catch(err => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
