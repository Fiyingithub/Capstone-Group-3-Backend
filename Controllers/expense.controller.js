import Expense from '../models/expense.model.js';

// CREATE
export const createExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const categories = Array.isArray(category) ? category : [category];
    const expense = await Expense.create({
      userId: req.user.id,  // coming from auth
      amount,
      description,
      category: categories,
      paymentMethod,
      date,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error creating expense', error: err.message });
  }
};

// GET All
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
       where: { userId: req.user.id },
      order: [['date', 'DESC']],
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
};

// GET one
export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ 
       where: { id: req.params.id,
        userId: req.user.id,
              },
    });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error getting expense', error: err.message });
  }
};

// UPDATE
export const updateExpense = async (req, res) => {
  try {
    if (req.body.category) {
      req.body.category =Array.is Array(req.body.category) ? req.body.category :[req.body.category];
    }
    const [updatedcount] = await Expense.update(req.body, {
     where: {id: req.params.id,
        userId: req.user.id,
      },
    });
    
    if (updatedcount ===0) return res.status(404).json({ message: 'Expense not found' });
  const updatedExpense  = await Expense.fndOne({
    where: {id : req.params.id, userId: req.user.id},
  });

  res.json(updatedExpense);

// DELETE
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({
      where: {id: req.params.id,
        userId: req.user.id,
      },
  });
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense', error: err.message });
  }
};
