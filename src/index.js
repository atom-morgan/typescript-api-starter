import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config.json';
import api from './routes';

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
