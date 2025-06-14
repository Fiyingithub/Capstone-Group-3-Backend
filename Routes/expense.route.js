import express from "express";
import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../Controllers/expense.controller.js";
import { protectedAction } from "../Middlewares/protected.js";
import { createExpenseValidator } from "../Middlewares/validator.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expenses:
 *       type: object
 *       properties:
 *         amount:
 *           type: integer
 *           example: 12345
 *         description:
 *           type: string
 *           example: "Food for the week"
 *         category:
 *           type: string
 *           example: "Food"
 *         date:
 *           type: string
 *           format: dateOnly
 *           example: "2024-01-01"
 *     Create Expense:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - category
 *         - date
 *       properties:
 *         amount:
 *           type: integer
 *           example: 12345
 *         description:
 *           type: string
 *           example: "Food for the week"
 *         category:
 *           type: string
 *           example: "Food"
 *         date:
 *           type: date
 *           example: "2025-05-12"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         data:
 *           type: object
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// CREATE an expense
/**
 * @swagger
 * /api/expense:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               description:
 *                 type: string
 *                 example: "Transportation to school"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Transport", "Food"]
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post("/", protectedAction, createExpenseValidator, createExpense);

// GET all expenses
/**
 * @swagger
 * /api/expense:
 *   get:
 *     summary: Get all expenses for the authenticated user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/", protectedAction, getExpenses);

// GET a single expense by ID
/**
 * @swagger
 * /api/expense/{id}:
 *   get:
 *     summary: Get a specific expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to retrieve
 *     responses:
 *       200:
 *         description: Expense retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/:id", protectedAction, getExpense);

// UPDATE an expense by ID
/**
 * @swagger
 * /api/expense/{id}:
 *   patch:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.patch("/:id", protectedAction, updateExpense);

// DELETE an expense by ID
/**
 * @swagger
 * /api/expense/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.delete("/:id", protectedAction, deleteExpense);

const expenseRoutes = router;

export default expenseRoutes;
