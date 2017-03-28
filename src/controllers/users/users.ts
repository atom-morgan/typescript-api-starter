import User from '../../models/user';

function get(req, res) {
  User.findOne({ username: req.params.username })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ 'resource': 'users', 'message': 'User does not exist!' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function create(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: 'User could not be created.' });
    });
}

export default { get, create };
