import Question from '../../models/question';

function get(req, res) {
  Question.findOne({ _id: req.params.id })
    .populate('_creator')
    .populate('_post')
    .exec((err, question) => {
      if (err) { res.status(404).send(err); }
      res.status(200).json(question);
    });
}

function create(req, res) {
  const question = new Question({
    content: req.body.content,
    _creator: req.body._creator,
    _post: req.body._post
  });

  question.save()
    .then((question) => {
      res.status(200).json(question);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Question could not be created.' });
    });
}

export default { get, create };