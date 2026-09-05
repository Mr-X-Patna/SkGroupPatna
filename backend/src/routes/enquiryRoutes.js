const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { enquiryLimiter } = require('../middleware/rateLimiter');
const { validateEnquiry } = require('../middleware/sanitize');

// Public route - submit enquiry
router.post('/', enquiryLimiter, validateEnquiry, enquiryController.submitEnquiry);

// Admin routes (protected)
router.get('/', authenticate, isAdmin, enquiryController.getEnquiries);
router.get('/unread-count', authenticate, isAdmin, enquiryController.getUnreadCount);
router.put('/:id/read', authenticate, isAdmin, enquiryController.markAsRead);
router.delete('/:id', authenticate, isAdmin, enquiryController.deleteEnquiry);

module.exports = router;