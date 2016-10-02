/// <reference path="../typings/index.d.ts" />
"use strict";
var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var routes_1 = require('./routes');
var config = require('./config.json');
var app = express();
if (process.env.NODE_ENV === 'test') {
    config = require('./dev.json');
}
app.use(cors());
app.use(bodyParser.json({ limit: config.bodyLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = Promise;
mongoose.connect(config.testDB);
app.get('/', function (req, res) {
    res.send('Hello, world!');
});
app.use('/api', routes_1.default);
app.set('port', process.env.PORT || config.port);
http.createServer(app).listen(app.get('port'));
console.log("Ready on port " + app.get('port'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
