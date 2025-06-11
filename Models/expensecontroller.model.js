const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'transportation', 'bills', 'shopping', 'school-supplies', 'entertainment', 'other'],
    default: 'other'
  },
  paymentMethod: {
    type: String,
    enum: [ 'card', 'transfer'],
    default: 'other'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
