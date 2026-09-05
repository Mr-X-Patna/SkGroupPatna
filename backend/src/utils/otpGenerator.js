const crypto = require('crypto');

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const isOTPExpired = (createdAt) => {
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
    const expiryTime = new Date(createdAt).getTime() + expiryMinutes * 60 * 1000;
    return Date.now() > expiryTime;
};

module.exports = { generateOTP, isOTPExpired };