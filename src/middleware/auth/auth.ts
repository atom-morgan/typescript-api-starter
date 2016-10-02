import * as jwt from 'jsonwebtoken';
import Promise = require('bluebird');
let config = require('../../config.json');

const isAuthenticated = function(req, res, next) {
  let token = req.get('Authorization');
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
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
