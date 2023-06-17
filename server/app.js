var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db_connect = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flashcardRouter = require('./routes/flashcards');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flashcards', flashcardRouter);

db_connect().catch(err => {
    console.log(`Couldn't connect to db due to error: ${err.message}`);
});

module.exports = app;
