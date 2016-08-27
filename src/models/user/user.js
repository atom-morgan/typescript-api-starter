import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String }
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
  return bcrypt.compare(password, this.password, function(err, res) {
    if (err) { return err; }
    return res;
  });
};

export default mongoose.model('User ', UserSchema);