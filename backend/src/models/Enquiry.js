const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        service: {
            type: String,
            enum: ['Real Estate', 'Transportation', 'Cyber Cafe'],
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        ipAddress: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Enquiry', EnquirySchema);