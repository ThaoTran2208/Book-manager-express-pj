var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var User = require('../models/users');

module.exports.signUp = (req, res) => {
  res.render("signup/signup");
}

module.exports.postSignUp = async (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  req.body.isAdmin = false;
  req.body.wrongPasswordCount = 0;
  await User.create(req.body);
  res.redirect('/auth/login');
};