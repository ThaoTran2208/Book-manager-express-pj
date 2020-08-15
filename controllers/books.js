var cloudinary = require('cloudinary').v2;

var Book = require('../models/books');
var User = require('../models/users');
var Transaction = require('../models/transactions');

module.exports.getindex = async (req, res) => {
  res.render('books/index', {
    books: await Book.find(),
    user : await User.findById(req.signedCookies.userId),
    values: req.body
  });
};

module.exports.postindex = async (req, res) => {
  
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.cover = result.url;
    await Book.create(req.body);
    res.redirect("/books");
  });
};

module.exports.getview = async (req, res) => {
  var id = req.params.id;
  var book = await Book.findById(id);
  res.render('books/view', {
    book: book,
    user : await User.findById(req.signedCookies.userId)
  });
};

module.exports.getupdate = async (req, res) => {
  var id = req.params.id;
  var book = await Book.findById(id);
  res.render('books/update', {
    book: book,
    values: req.body
  });
};

module.exports.postupdate = async (req, res) => {
  var id = req.params.id;
  
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.cover = result.url;
    if(req.body.title){
      await Book.findByIdAndUpdate(id, {title: req.body.title});
      res.redirect('/books');
    }
    if(req.body.description){
      await Book.findByIdAndUpdate(id, {description: req.body.description});
      res.redirect('/books');
    }
    if(req.body.cover){
      await Book.findByIdAndUpdate(id, {cover: req.body.cover});
      res.redirect('/books');
    }
  });
};

module.exports.getdelete = async (req, res) => {
  await Book.findByIdAndRemove(req.params.id);
  await Transaction.findByIdAndRemove(req.params.id);
  res.redirect("/books");
}