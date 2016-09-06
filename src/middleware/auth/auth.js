import jwt from 'jsonwebtoken';
import config from '../../config.json';

const isAuthenticated = function(req, res, next) {
  let token = req.get('Authorization');
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) { return res.status(403).json({ message: err.message }); }
      if (decoded) {
        // TODO - is this needed?
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: 'No token provided!' });
  }
};

export default { isAuthenticated };
