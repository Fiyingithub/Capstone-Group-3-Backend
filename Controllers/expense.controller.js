import Expense from "../Models/expense.model.js";
import User from "../Models/user.model.js";
import logger from "../Utils/Logger.js";

// CREATE
export const createExpense = async (req, res) => {
  try {
    const { id } = req.user;
    const { amount, description, category, date } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
        data: [],
      });
    }

    const expense = await Expense.create({
      userId: id, // coming from auth
      amount,
      description,
      category,
      date: date || new Date(),
    });

    return res.status(201).json({
      status: true,
      message: "Expense Created Successfully",
      data: expense,
    });
  } catch (err) {
    logger.info("Error Message from Logger:", err);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// GET All
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    if (!expenses) {
      return res.status(400).json({
        status: false,
        message: "Expense does not exist",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Expense Fetch",
      data: expenses,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching expenses", error: err.message });
  }
};

// GET one
export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!expense) {
      return res.status(400).json({
        status: false,
        message: "Expense does not exist",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Expense Fetch",
      data: expense,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting expense", error: err.message });
  }
};

// UPDATE
export const updateExpense = async (req, res) => {
  try {
    const [updatedCount] = await Expense.update(req.body, {
      where: { id: req.params.id, userId: req.user.id },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedExpense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.status(200).json({
      status: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error updating expense",
      error: err.message,
    });
  }
};


// DELETE
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: err.message });
  }
};
