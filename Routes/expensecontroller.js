const express = require('express');
const router = express.Router();
const Expensecontroller = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/auth'); // adjust path if needed

// CREATE an expense
router.post('/', authMiddleware, Expensecontroller.createExpense);

// GET all expenses
router.get('/', authMiddleware, Expensecontroller.getExpenses);

// GET a single expense by ID
router.get('/:id', authMiddleware, Expensecontroller.getExpense);

// UPDATE an expense by ID
router.put('/:id', authMiddleware, Expensecontroller.updateExpense);

// DELETE an expense by ID
router.delete('/:id', authMiddleware, Expensecontroller.deleteExpense);

module.exports = router;
