import { sequelize } from "../Config/db.config.js";
import Expense from "./expense.model.js";
// import Book from "./book.model.js";
// import Review from "./review.model.js";
import User from "./user.model.js";

// Book.hasMany(Review, {foreignKey: 'bookId', onDelete: 'CASCADE'});
// Review.belongsTo(Book, {foreignKey: 'bookId'});

Expense.belongsTo(User, { foreignKey: 'id', onDelete: 'CASCADE'} )

export { sequelize, User, Expense };