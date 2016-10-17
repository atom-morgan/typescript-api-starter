import * as mongoose from 'mongoose';
import bcrypt = require('bcrypt');
import Promise = require('bluebird');

const UserSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: { type: String, select: false }
});

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

export default mongoose.model('User', UserSchema);