var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  wrongPasswordCount: Number,
  avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;