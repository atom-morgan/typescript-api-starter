import Post from '../../models/post';

function get(req, res) {
  Post.findById({ _id: req.params.id })
    .populate('_creator')
    .exec((err, post) => {
      if (err) { res.status(500).send(err); }
      res.status(200).json(post);
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

export default { get, create };