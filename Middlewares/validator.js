import { body, query, param, validationResult } from 'express-validator';

export const createUserValidator = [
    body('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('Enter a Valid email'),
    body('password').notEmpty().withMessage("Password field is required"),
    body('firstname').notEmpty().withMessage('Firstname field  is required'),
    body('lastname').notEmpty().withMessage('Lastname field is required'),
    body('phoneNumber').notEmpty().withMessage('Phone Number is required')
]

export const loginUserValidator = [
    body('email').escape().isEmail().withMessage('Enter a Valid email'),
    body('password').escape().notEmpty().withMessage('Password Field is required')
]

export const resendOtpValidator = [
    body('email').escape().isEmail().withMessage('Enter a Valid email'),

]
export const verifyOtpValidator = [
    body('email').escape().isEmail().withMessage('Enter a Valid email'),
    body('otp').escape().isEmail().withMessage('OTP is required')
]

export const changePasswordValidator = [
    body('currentPassword').escape().notEmpty().withMessage('Enter a password'),
    body('newPassword').escape().notEmpty().withMessage('Password is required')
]

export const resetPasswordValidator = [
    body('password').escape().notEmpty().withMessage('A password is required'),
    param('token').escape().notEmpty().withMessage('A token is required'),
]

export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
}