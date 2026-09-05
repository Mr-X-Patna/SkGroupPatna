const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const { validateLogin } = require('../middleware/sanitize');

// Step 1: Request OTP (login)
router.post('/login/request-otp', loginLimiter, validateLogin, authController.requestLoginOTP);

// Step 2: Verify OTP & login
router.post('/login/verify-otp', loginLimiter, authController.verifyLoginOTP);

// Logout
router.post('/logout', authController.logout);

// Forgot password - request OTP
router.post('/forgot/request-otp', loginLimiter, authController.requestForgotOTP);

// Forgot password - reset
router.post('/forgot/reset', loginLimiter, authController.resetPassword);

// Get current user
router.get('/me', authenticate, authController.getMe);

module.exports = router;