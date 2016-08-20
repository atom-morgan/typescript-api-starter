import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.server.listen(process.env.PORT || config.port);
console.log(`Ready on port ${app.server.address().port}`);

export default app;
