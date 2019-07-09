import User from '../../models/user';
import Post from '../../models/post';
import Question from '../../models/question';
import Relationship from '../../models/relationship';
import Promise = require('bluebird');

function destroy(req, res) {
  Promise.all([
    User.remove({}),
    Post.remove({}),
    Question.remove({}),
    Relationship.remove({})
  ])
  .then((resp) => {
    res.status(200).json(resp);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

export default { destroy };
