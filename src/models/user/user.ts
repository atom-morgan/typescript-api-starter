import * as mongoose from 'mongoose';
import bcrypt = require('bcryptjs');
import Promise = require('bluebird');
import uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: { type: String, minlength: 5, select: false },
  followingCount: { type: Number, default: 0 },
  followerCount: { type: Number, default: 0 }
}, {usePushEach: true});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) { return next(); }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) { return next(err); }
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, res) {
      if (err) { return reject(err); }
      return resolve(res);
    });
  });
};

UserSchema.post('save', (err: any, doc, next) => {
  if (err.name === 'ValidationError') {
    next(new Error('User validation failed'));
  } else if (err.name === 'ValidationError' && err.errors.username && err.errors.username.kind === 'unique') {
    next(new Error('This user already exists!'));
  } else {
    next(err);
  }
});

export default mongoose.model('User', UserSchema);