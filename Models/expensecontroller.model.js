import mongoose from 'mongoose';

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
    enum: [ 'cash', 'card', 'transfer', 'other' ],
    default: 'other'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
