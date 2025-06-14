import Expense from "../Models/expense.model.js";
import Income from "../Models/income.model.js";
import User from "../Models/user.model.js";
import logger from "../Utils/Logger.js";

// CREATE
export const createIncome = async (req, res) => {
  try {
    const { id } = req.user;
    const { incomeAmount, sourceOfIncome, description, date } = req.body;

    const file = req.file;
    const filePath = file ? file.path : null;
    const fileName = file ? file.filename : null;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
        data: [],
      });
    }

    const income = await Income.create({
      userId: id, // coming from auth
      incomeAmount,
      description,
      sourceOfIncome,
      filePath,
      date: date || new Date(),
    });

    return res.status(201).json({
      status: true,
      message: "Income Created Successfully",
      data: income,
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
export const getAllIncome = async (req, res) => {
  try {
    const income = await Income.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    if (!income) {
      return res.status(400).json({
        status: false,
        message: "Income does not exist",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Income Fetch",
      data: income,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching income", error: err.message });
  }
};

// GET one
export const getIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!income) {
      return res.status(400).json({
        status: false,
        message: "Expense does not exist",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Expense Fetch",
      data: income,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting expense", error: err.message });
  }
};

// UPDATE
export const updateIncome = async (req, res) => {
  try {
    const [updatedCount] = await Income.update(req.body, {
      where: { id: req.params.id, userId: req.user.id },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedIncome = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.status(200).json({
      status: true,
      message: "Income updated successfully",
      data: updatedIncome,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error updating Income",
      error: err.message,
    });
  }
};

// DELETE
export const deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!deleted) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting income", error: err.message });
  }
};
