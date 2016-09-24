/// <reference path="../typings/index.d.ts" />

import http = require('http');
import * as express from 'express';
import cors = require('cors');
import bodyParser = require('body-parser');
import Promise = require('bluebird');
import mongoose = require('mongoose');
import api from './routes';
let config = require('./config.json');

let app = express();

app.use(cors());
app.use(bodyParser.json({ limit: config.bodyLimit }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect(config.testDB);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/api', api);

app.set('port', process.env.PORT || config.port);
http.createServer(app).listen(app.get('port'));
console.log(`Ready on port ${app.get('port')}`);

export default app;
