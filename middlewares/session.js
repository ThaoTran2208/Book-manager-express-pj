var Session = require("../models/session");
var ObjectID = require("mongodb").ObjectID;

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    
    var newSession = await Session.create({});
    
    res.cookie("sessionId", newSession.id, {
      signed: true,
      sameSite: 'none',
      secure: true
    });
    
  }
  
  var session = await Session.findById(req.signedCookies.sessionId);

  var count = 0;

  if (session) {
    for (var book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.count = count;
  
  res.locals.session = session;

  next();
};
