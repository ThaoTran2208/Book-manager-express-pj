var Session = require("../models/session");

module.exports.addToCart = async (req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect("/books");
  }

  var session = res.locals.session;
  var book = session.cart.find(
    cartItem => cartItem.bookId.toString() === bookId
  );

  if (book) {
    book.quantity += 1;
    session.save();
  } else {
    await Session.findByIdAndUpdate(sessionId, {
      $push: { cart: { bookId, quantity: 1 } }
    });
  }

  res.redirect("/books");
};