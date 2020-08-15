var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new mongoose.Schema({
  cart: [
    {
      bookId:{ type: Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ]
});

var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;