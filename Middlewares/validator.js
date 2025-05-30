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


// export const createReviewValidator = [
//     body('reviewer').escape().notEmpty().withMessage('Reviewer is required'),
//     body('rating').escape().isInt({min:1, max: 10}).withMessage('Rating must be between 1 and 10'),
//     body('comment').escape().notEmpty().withMessage('A comment is required'),
//     param('bookId').escape().isInt().withMessage('A valid book id is required'),
// ]

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