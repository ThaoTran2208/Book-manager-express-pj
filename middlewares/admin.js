var User = require('../models/users')

module.exports.adminRole = async (req, res, next) => {
  var user = await User.findById(req.signedCookies.userId);
  if (!user.isAdmin){
    res.sendStatus(403);
  } 
  next();
}
//xin chào bạn
