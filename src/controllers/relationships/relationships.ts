import Relationship from '../../models/relationship';
import User from '../../models/user';
import Promise = require('bluebird');

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

export default { create };
