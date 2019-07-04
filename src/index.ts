import http = require('http');
import * as express from 'express';
import cors = require('cors');
import bodyParser = require('body-parser');
import Promise = require('bluebird');
import mongoose = require('mongoose');
import api from './routes';

let config;

if (process.env.NODE_ENV === 'test') {
  config = require('./test-config.json');
} else if (process.env.NODE_ENV === 'development') {
  config = require('./dev-config.json');
}

let app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const OPTIONS = {
  useMongoClient: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
};
const DATABASE = process.env.MONGODB_URI || config.db;
mongoose.Promise = Promise;
mongoose.connect(DATABASE, OPTIONS);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/api', api);

app.set('port', process.env.PORT || config.port);
http.createServer(app).listen(app.get('port'));
console.log(`Ready on port ${app.get('port')}`);
console.log(`Using DB ${DATABASE}`);

export default app;
