var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

const initDb = require("./pollution-db").initDb;
var app = express();

const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1', users);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

initDb(function (err) {
  app.listen(port, function (err) {
      if (err) {
          throw err;
      }
      console.log("API Up and running on port " + port);
  });
});

module.exports = app;