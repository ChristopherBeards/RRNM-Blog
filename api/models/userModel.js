const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, 11)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => err);
});

module.exports = mongoose.model('User', UserSchema);