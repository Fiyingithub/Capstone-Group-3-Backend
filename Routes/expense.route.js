import express from 'express';
import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expense.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// CREATE an expense
router.post('/', authMiddleware, createExpense);

// GET all expenses
router.get('/', authMiddleware, getExpenses);

// GET a single expense by ID
router.get('/:id', authMiddleware, getExpense);

// UPDATE an expense by ID
router.put('/:id', authMiddleware, updateExpense);

// DELETE an expense by ID
router.delete('/:id', authMiddleware, deleteExpense);

const expenseRoutes = router;

export default expenseRoutes;
