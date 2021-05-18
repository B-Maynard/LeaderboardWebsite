var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var secret = require('./secret.json');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games')
var signinRouter = require('./routes/signin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: secret.secret, cookie: {}}));

app.use('/', indexRouter);
app.get('/games', gamesRouter);
app.get('/signin', signinRouter);

module.exports = app;
