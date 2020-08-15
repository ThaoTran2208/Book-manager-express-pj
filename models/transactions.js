var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  isComplete: Boolean
});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;