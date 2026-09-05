const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 min
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
    message: { message: 'Too many login attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const enquiryLimiter = rateLimit({
    windowMs: 3600000, // 1 hour
    max: 10,
    message: { message: 'Too many enquiries from this IP. Please try again later.' },
});

module.exports = { loginLimiter, enquiryLimiter };