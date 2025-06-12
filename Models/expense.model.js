import { DataTypes } from 'sequelize';
import sequelize from "../config/db.config.js"; 

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
    defaultValue: DataTypes.NOW,
}}, 
  {
  timestamps: true,
});
                                
export default Expense;
