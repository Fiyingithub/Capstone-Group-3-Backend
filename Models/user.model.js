import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../Config/db.config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // role: {
    //   type: DataTypes.ENUM("user", "admin"),
    //   defaultValue: "user",
    //   allowNull: false,
    // },
    // lastname: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // phoneNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // isVerified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    // otpHash: { type: DataTypes.STRING },
    // otpExpiresAt: { type: DataTypes.DATE },
  },
  { timestamps: true }
);

export default User;
