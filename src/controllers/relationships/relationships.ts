import Relationship from '../../models/relationship';
import User from '../../models/user';
import Promise = require('bluebird');

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
    });
}

function destroy(req, res) {
  return Relationship.findOneAndRemove({
    followerId: req.body.followerId,
    followedId: req.body.followedId
  })
  .exec()
  .then((result) => {
    return Promise.all([
      decrementFollowerCount(req.body.followedId),
      decrementFollowingCount(req.body.followerId)
    ])
    .then((resp) => {
      res.status(200).json({ 'message': 'Successfully unfollowed user!' });
    })
  })
  .catch((err) => {
    res.status(500).json({ 'error': 'User does not exist!' });
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

export default { create, destroy };
