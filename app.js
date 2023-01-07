var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//new
var bodyParser = require('body-parser')
var app = express();
// view engine setup
require("./lib/connectMongoose")
require("./routes/api/products.js")
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, "/public")))
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//use api
app.use("/api/products", require("./routes/api/products"))
app.use("/", require("./routes/nodepop/page"))

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


module.exports = app