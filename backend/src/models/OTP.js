const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
        },
        otp: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['login', 'register', 'forgot'],
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 },
        },
    },
    { timestamps: true }
);

OTPSchema.pre('save', function (next) {
    if (!this.expiresAt) {
        this.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    }
    next();
});

module.exports = mongoose.model('OTP', OTPSchema);