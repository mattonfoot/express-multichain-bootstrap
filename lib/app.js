var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

var inDev = app.get('env') === 'development';
var includeErrorDetails = true || inDev;
var staticCacheMaxAge = inDev ? 0 : 1000 * 60 * 60 * 24 * 30;
var defaultStaticOptions = { index: false, maxAge: staticCacheMaxAge };

// view engine setup
app.set('views',        path.join(__dirname, 'views'));
app.engine('.hbs',      exphbs({ defaultLayout: 'basic', extname: '.hbs' }));
app.set('view engine',  'hbs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// public and views come form platform.basic package
app.use(express.static(path.join(__dirname, 'public'), defaultStaticOptions));

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;

  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.render('error', { message: err.toString(), error: includeErrorDetails ? err : {} });
});

module.exports = app;
