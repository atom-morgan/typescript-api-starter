import * as jwt from 'jsonwebtoken';
import Promise = require('bluebird');
let config;

if (process.env.NODE_ENV === 'test') {
  config = require('../../test-config.json');
} else if (process.env.NODE_ENV === 'development') {
  config = require('../../dev-config.json');
}

let SECRET = process.env.SESSION_SECRET || config.secret;

const isAuthenticated = function(req, res, next) {
  let token = req.get('Authorization');
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, SECRET, function(err, decoded) {
        if (err) { return reject(res.status(403).json({ message: err.message })); }
        if (decoded) {
          req.decoded = decoded;
          return resolve(next());
        }
      });
    } else {
      return reject(res.status(403).json({ message: 'No token provided!' }));
    }
  });
};

export default { isAuthenticated };
