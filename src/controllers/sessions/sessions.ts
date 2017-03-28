import User from '../../models/user';
import jwt = require('jsonwebtoken');
let config = require('../../config.json');

function create(req, res) {
  User.findOne({ username: req.body.username }).select('username password')
    .then(function(user) {
      if (!user) { return res.status(404).json({ error: 'User could not be found' }); }
      user.comparePassword(req.body.password)
        .then(function(result) {
          let isValidPassword = result;
          if (!isValidPassword) { return res.status(500).json({ error: 'Incorrect password' }); }
          jwt.sign({ username: req.body.username, id: user._id }, config.secret, { expiresIn: '24h' }, function(err, token) {
            if (err) { return res.status(500).json({ error: 'Could not create token' }); }
            return res.status(200).json({ token: token });
          });
        })
        .catch(function(result) {
          // TODO handle rejected result
        });
    });
}

export default { create };
