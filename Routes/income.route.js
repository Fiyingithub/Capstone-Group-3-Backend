import express from "express";
import { protectedAction } from "../Middlewares/protected.js";
import { createIncome, deleteIncome, getAllIncome, getIncome, updateIncome } from "../Controllers/income.controller.js";
import { createIncomeValidator } from "../Middlewares/validator.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       properties:
 *         incomeAmount:
 *           type: integer
 *           example: 12345
 *         description:
 *           type: string
 *           example: "Food for the week"
 *         sourceOfInncome:
 *           type: string
 *           example: "Food"
 *         date:
 *           type: string
 *           format: dateOnly
 *           example: "2024-01-01"
 *     Create Income:
 *       type: object
 *       required:
 *         - incomeAmount
 *         - description
 *         - sourceOfIncome
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
 * /api/income:
 *   post:
 *     summary: Create a user Income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - incomeAmount
 *               - sourceOfIncome
 *               - date
 *             properties:
 *               incomeAmount:
 *                 type: number
 *                 example: 5000
 *               description:
 *                 type: string
 *                 example: "I have other businesses"
 *               sourceOfIncome:
 *                 type: string
 *                 example: "Transport"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *     responses:
 *       201:
 *         description: Income created successfully
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post("/", createIncomeValidator, protectedAction, createIncome);

// GET all income by a User
/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Get all income for the authenticated user
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of income
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/", protectedAction, getAllIncome);


// GET a single Income by ID
/**
 * @swagger
 * /api/income/{id}:
 *   get:
 *     summary: Get a specific expense by ID
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the income to retrieve
 *     responses:
 *       200:
 *         description: Income retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/:id", protectedAction, getIncome);

// UPDATE an Inome by ID
/**
 * @swagger
 * /api/income/{id}:
 *   patch:
 *     summary: Update an existing income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the income to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               incomeAmount:
 *                 type: number
 *               description:
 *                 type: string
 *               sourceOfInncome:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Income updated successfully
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

router.patch("/:id", protectedAction, updateIncome);

// DELETE an Income by ID
/**
 * @swagger
 * /api/income/{id}:
 *   delete:
 *     summary: Delete an user Income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the income to delete
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Income deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.delete("/:id", protectedAction, deleteIncome);

const incomeRoutes = router;

export default incomeRoutes;
