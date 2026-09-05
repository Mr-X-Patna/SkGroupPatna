const { body, validationResult } = require('express-validator');

const validateEnquiry = [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('phone').trim().isLength({ min: 10 }).escape(),
    body('email').optional().trim().isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 5 }).escape(),
    body('service').isIn(['Real Estate', 'Transportation', 'Cyber Cafe']),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('password').trim().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateEnquiry, validateLogin };