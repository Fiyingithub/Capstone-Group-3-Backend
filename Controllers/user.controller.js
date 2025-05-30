import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../Utils/Logger.js";
// import { sendEmail } from "../Services/email.service.js";

dotenv.config();

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phoneNumber, role } =
      req.body;

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(404).json({
        status: false,
        message: "Email has been used",
        data: [],
      });
    }

    const checkPhone = await User.findOne({ where: { phoneNumber } });

    if (checkPhone) {
      return res.status(404).json({
        status: false,
        message: "Phone Number has been used",
        data: [],
      });
    }

    const Salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, Salt);

    const user = await User.create({
      email,
      firstname,
      lastname,
      phoneNumber,
      password: hashed_password,
      role: role || "user",
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Could not create the user",
        data: [],
      });
    }

    const userDTO = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    // sendEmail(email, "Welcome to Book Reviews", "Thank you for signing up!");

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: userDTO,
    });
  } catch (error) {
    console.log("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Does not exist",
        data: [],
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
        data: [],
      });
    }

    let payload = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    };
    let token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    payload.token = token;

    logger.info(`${user.name} login successfully`);
    return res.status(201).json({
      status: true,
      message: "user login successfully",
      data: payload,
    });
  } catch (error) {
    logger.info("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// get user profile
// export const userProfile = async (req, res) => {
//   return res.status(200).json({
//     status: true,
//     message: "user profile retrieved successfully",
//     data: req.user,
//   });
// };

// get All users

export const getAllUsers = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findAll({
      where: email,
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "user Fetched successfully",
      data: user,
    });
  } catch (error) {
    logger.info("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// get a single user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "user retrieved successfully",
      data: user,
    });
  } catch (error) {
    logger.info("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
        data: [],
      });
    }

    await user.update(req.body);

    return res.status(200).json({
      status: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    logger.info("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
        data: [],
      });
    }

    await user.destroy();

    return res.status(200).json({
      status: true,
      message: "user deleted successfully",
      data: [],
    });
  } catch (error) {
    logger.info("ERROR MESSAGE", error);
    return res.status(500).json({
      status: true,
      message: "An error occured",
      eror: true,
    });
  }
};
