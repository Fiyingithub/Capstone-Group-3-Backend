import Expense from '../models/expensecontroller.model.js';

// CREATE
export const createExpense = async (req, res) => {
  try {
    const { amount, description, category, paymentMethod } = req.body;
    const expense = new Expense({
      user: req.user.id,  // coming from auth
      amount,
      description,
      category,
      paymentMethod,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error creating expense', error: err.message });
  }
};

// GET All
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
};

// GET one
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error getting expense', error: err.message });
  }
};

// UPDATE
exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating expense', error: err.message });
  }
};

// DELETE
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense', error: err.message });
  }
};
