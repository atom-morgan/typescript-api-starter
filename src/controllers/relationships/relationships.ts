import Relationship from '../../models/relationship';
import User from '../../models/user';
import Promise = require('bluebird');

function get(req, res) {
  return Relationship.findOne({
    followerId: req.params.username,
    followedId: req.params.targetUser
  })
  .exec()
  .then((result) => {
    if (result === null) {
      res.status(404).json({ message: 'This relationship does not exist!' });
    } else {
      res.status(200).json(result);
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

function create(req, res) {
  const relationship = new Relationship({
    followerId: req.body.followerId,
    followedId: req.body.followedId
  });

  relationship.save()
    .then((relationship) => {
      return Promise.all([
        incrementFollowerCount(relationship.followedId),
        incrementFollowingCount(relationship.followerId)
      ])
      .then((resp) => {
        res.status(200).json(relationship);
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

function destroy(req, res) {
  return Relationship.findOneAndRemove({
    followerId: req.params.username,
    followedId: req.params.targetUser
  })
  .exec()
  .then((result) => {
    if (!result) {
      return result;
    } else {
      return Promise.all([
        decrementFollowerCount(req.params.targetUser),
        decrementFollowingCount(req.params.username)
      ]);
    }
  })
  .then((resp) => {
    if (!resp) {
      res.status(404).json({ 'resource': 'relationships', 'message': 'This relationship does not exist!' });
    } else {
      res.status(200).json({ 'message': 'Successfully unfollowed user!' });
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

function incrementFollowerCount(id) {
  return User.findById({ _id: id }).exec().then((user) => {
    user.followerCount += 1;
    return user.save();
  });
}

function incrementFollowingCount(id) {
  return User.findById({ _id: id }).exec().then((user) => {
    user.followingCount += 1;
    return user.save();
  });
}

function decrementFollowerCount(id) {
  return User.findById({ _id: id }).exec().then((user) => {
    user.followerCount -= 1;
    return user.save();
  });
}

function decrementFollowingCount(id) {
  return User.findById({ _id: id }).exec().then((user) => {
    user.followingCount -= 1;
    return user.save();
  });
}

export default { create, destroy, get };
