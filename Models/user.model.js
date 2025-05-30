import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    firstname: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    lastname: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    phoneNumber: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  { timestamps: true }
);

export default User;
