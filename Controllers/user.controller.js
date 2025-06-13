import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../Utils/Logger.js";
// import { sendEmail } from "../Services/email.service.js";
import nodemailer from "nodemailer";
// import crypto from "crypto";
// import { error } from "console";

dotenv.config();

// Create a new user

export const createUser = async (req, res) => {
  try {
    const { email, password, fullname } =
      req.body;

    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email has been used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const otp = crypto.randomInt(100000, 999999).toString();
    // const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    // const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      email,
      fullname,
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "adegbengaoluwatosin61@gmail.com", // Sender email
      to: user.email,
      subject: "Account created successfully",
      html: `
        <div>
          <h1 style="text-align: center; color: #00008b;">Account created successfully</h1>
          <p>Dear ${user.fullname},</p>
          <p>You have successfully created your Account</p>
          <p>Do not share your password with no one and do not reply to this email</p>
          <p>Best regards</p>
          <a href="#" style="text-align: center; color: #00008b;">Trackwise Expense</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      status: true,
      message: "User created successfully.",
      data: {
        email: user.email,
        fullname: user.fullname
      },
    });
  } catch (error) {
    console.log("ERROR MESSAGE", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred",
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
      fullname: user.fullname
    };
    let token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    payload.token = token;

    logger.info(`${user.fullname} login successfully`);
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
    const { id } = req.user;
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
      message: "Updated successfully",
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

    if (user.id !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
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

export const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
        data: [],
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!checkPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: "Current Password does not match",
        data: [],
      });
    }

    if (currentPassword === newPassword) {
      return res.status(401).json({
        status: false,
        message: "Password can not be the same",
        data: [],
      });
    }

    const Salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(newPassword, Salt);

    user.password = hashed_password;

    await user.save();

    const userDTO = {
      email: user.email,
      fullname: user.fullname

    };

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: userDTO,
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

// export const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || !user.otpHash || !user.otpExpiresAt) {
//       return res.status(404).json({
//         status: false,
//         message: "Invalid or expired OTP",
//       });
//     }

//     // Check if OTP expired
//     if (new Date() > user.otpExpiresAt) {
//       return res.status(400).json({
//         status: false,
//         message: "OTP has expired. Please request a new one.",
//       });
//     }

//     // Hash the input OTP
//     const hashedInputOtp = crypto
//       .createHash("sha256")
//       .update(otp)
//       .digest("hex");

//     // Compare with stored hash
//     if (hashedInputOtp !== user.otpHash) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid OTP. Please try again.",
//       });
//     }

//     // Update user verification status and clear OTP fields
//     user.isVerified = true;
//     user.otpHash = null;
//     user.otpExpiresAt = null;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: "adegbengaoluwatosin61@gmail.com", // Sender email
//       to: user.email,
//       subject: "OTP Verified successfully",
//       html: `
//         <div>
//           <h1 style="text-align: center; color: #00008b;">OTP Verification Successfull</h1>
//           <p>Dear ${user.firstname},</p>
//           <p>You have successfully verify your Account. </p>
//           <p>Do not share your password with no one and do not reply to this email</p>
//           <p>Best regards</p>
//           <a href="#" style="text-align: center; color: #00008b;">Trackwise Expense</a>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({
//       status: true,
//       message: "Email verified successfully",
//     });
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     return res.status(500).json({
//       status: false,
//       message: "An error occurred while verifying OTP",
//     });
//   }
// };

// export const resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User Does not exist",
//         data: [],
//       });
//     }

//     if (user.isVerified === true) {
//       return res.status(404).json({
//         status: false,
//         message: "User Already verified",
//         data: [],
//       });
//     }

//     if (new Date() < user.otpExpiresAt) {
//       return res.status(400).json({
//         status: false,
//         message: "Former OTP has not expired. Please verify with otp.",
//       });
//     }

//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
//     const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

//     user.otpHash = otpHash;
//     user.otpExpiresAt = otpExpiresAt;

//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: "adegbengaoluwatosin61@gmail.com", // Sender email
//       to: user.email,
//       subject: "OTP Verification",
//       html: `
//         <div>
//           <h1 style="text-align: center; color: #00008b;">OTP Verification Code</h1>
//           <p>Dear ${user.firstname},</p>
//           <p>You requested for otp. Verify Your OTP</p>
//           <p style="font-weight: 700; font-size: 20px; background-color: #facc15; padding: 1rem; border-radius: 5px; text-align: center;">${otp}</p>
//           <p>Do not share your OTP with no one and do not reply to this email</p>
//           <p>Best regards</p>
//           <a href="#" style="text-align: center; color: #00008b;">Trackwise Expense</a>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(201).json({
//       status: true,
//       message: "OTP sent successfully. Please verify your email.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       message: "An error occurred",
//       error: true,
//     });
//   }
// };

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Does not exist",
        data: [],
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "adegbengaoluwatosin61@gmail.com", // Sender email
      to: user.email,
      subject: "Password Reset",
      html: `
        <div>
          <h1 style="text-align: center; color: #00008b;">Password Reset Link</h1>
          <p>Dear User,</p>
          You requested a password reset. Click the link to reset your password.
          <a href="${resetUrl}" style="font-weight: 700; font-size: 20px; background-color: #facc15; padding: 1rem; border-radius: 5px; text-align: center;"> ${resetUrl}</a>
          <p>Do not share your Password with anyone and do not reply to this email</p>
          <p>Best regards</p>
          <a href="#" style="text-align: center; color: #00008b;">Trackwise Expense</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      status: true,
      message: "Reset Link sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred",
      error: true,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const Salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, Salt);

    user.password = hashed_password;

    await user.save();

    return res.status(201).json({
      status: true,
      message: "Password reset successfully",
      data: userDTO,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred",
      error: true,
    });
  }
};
