import Post from '../../models/post';

function get(req, res) {
  Post.findById({ _id: req.params.id })
    .populate('_creator')
    .exec()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
}

function getByUserId(req, res) {
  Post.find({ _creator: req.params.id })
    .exec()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
}

function create(req, res) {
  const post = new Post({
    _creator: req.body._creator,
    title: req.body.title,
    description: req.body.description,
    endTime: req.body.endTime
  });

  post.save()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Post could not be created.' });
    });
}

export default { get, getByUserId, create };
