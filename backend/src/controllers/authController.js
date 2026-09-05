const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateOTP, isOTPExpired } = require('../utils/otpGenerator');
const { sendOTPEmail } = require('../utils/emailService');
const jwt = require('jsonwebtoken');

// Helper to set JWT cookie
const setTokenCookie = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // HTTPS only
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
};

// Step 1: Request OTP for admin login
exports.requestLoginOTP = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Save OTP
        await OTP.create({
            email: user.email,
            otp,
            type: 'login',
            expiresAt,
        });

        // Send OTP email
        await sendOTPEmail(user.email, otp, 'login');

        res.status(200).json({
            message: 'OTP sent to your registered email.',
            email: user.email,
        });
    } catch (error) {
        console.error('Login OTP error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Step 2: Verify OTP and login
exports.verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email, otp, type: 'login' });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (isOTPExpired(otpRecord.createdAt)) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
        }

        const user = await User.findOne({ email });
        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Delete used OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        // Set JWT cookie
        setTokenCookie(res, user._id);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Forgot Password - Request OTP
exports.requestForgotOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email, isAdmin: true });
        if (!user) {
            return res.status(404).json({ message: 'Admin account not found with this email.' });
        }

        const otp = generateOTP();
        await OTP.create({
            email,
            otp,
            type: 'forgot',
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        await sendOTPEmail(email, otp, 'forgot');
        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Forgot OTP error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Forgot Password - Verify OTP & Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const otpRecord = await OTP.findOne({ email, otp, type: 'forgot' });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (isOTPExpired(otpRecord.createdAt)) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
        }

        const user = await User.findOne({ email, isAdmin: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash new password (handled by pre-save hook)
        user.password = newPassword;
        await user.save();

        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: 'Password reset successful. Please login again.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get current authenticated user (for session check)
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};