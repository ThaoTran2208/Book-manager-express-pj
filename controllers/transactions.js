var User = require('../models/users');
var Book = require('../models/books');
var Transaction = require('../models/transactions');

module.exports.getindex = async (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 5;
  
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  var transactions = await Transaction.find();
  var numOfTransactions = transactions.length;
  
  var user = await User.findById(req.signedCookies.userId);
  
  if(!user.isAdmin){
    var usertrans = await Transaction.find({userId: user.id});
      return res.render("transactions/usertrans", {
      usertrans: usertrans,
      books: await Book.find()
    });
  }
  
  res.render('transactions/index', {
    transactions: transactions.slice(start, end),
    users: await User.find(),
    books: await Book.find(),
    currentPage: page,
    pages: Math.ceil(numOfTransactions / perPage)
  });
};

module.exports.postindex = async (req, res) => {
  await Transaction.create(req.body);
  
  res.redirect('/transactions');
};


module.exports.addToTrans = async (req, res) => {
  
  var sessionId = req.params.sessionId;
  
  var session = res.locals.session;
  
  if(sessionId === session.id){
    
    for (var book of session.cart) {
      for (var i = 0; i < book.quantity; i++) {
        await Transaction.create({
          bookId: book.bookId,
          userId: req.signedCookies.userId
        });
      }
    };
    
    session.cart = [];
    session.save();
    
    res.redirect('/transactions');
    return;
  }
};

module.exports.getcomplete = async (req, res) => {
  await Transaction.findByIdAndUpdate(req.params.id, {isComplete: true});
  res.redirect('/transactions');
};
