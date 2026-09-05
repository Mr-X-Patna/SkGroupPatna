const Enquiry = require('../models/Enquiry');
const User = require('../models/User');

// Submit a new enquiry (public)
exports.submitEnquiry = async (req, res) => {
    try {
        const { name, phone, email, message, service } = req.body;

        const enquiry = await Enquiry.create({
            name,
            phone,
            email: email || '',
            message,
            service,
            ipAddress: req.ip || req.connection.remoteAddress,
        });

        // Emit real-time event via Socket.IO (attached to req.app.get('io'))
        const io = req.app.get('io');
        if (io) {
            io.emit('new-enquiry', {
                _id: enquiry._id,
                name: enquiry.name,
                service: enquiry.service,
                createdAt: enquiry.createdAt,
            });
        }

        res.status(201).json({
            message: 'Enquiry submitted successfully. We will contact you soon.',
            enquiry,
        });
    } catch (error) {
        console.error('Enquiry submit error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Get all enquiries (admin only)
exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ enquiries });
    } catch (error) {
        console.error('Get enquiries error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get unread count (for notification badge)
exports.getUnreadCount = async (req, res) => {
    try {
        const count = await Enquiry.countDocuments({ isRead: false });
        res.status(200).json({ unreadCount: count });
    } catch (error) {
        console.error('Unread count error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Mark as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found.' });
        }
        res.status(200).json({ message: 'Marked as read.', enquiry });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found.' });
        }
        res.status(200).json({ message: 'Enquiry deleted successfully.' });
    } catch (error) {
        console.error('Delete enquiry error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};