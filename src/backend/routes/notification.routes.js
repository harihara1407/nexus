
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middleware/auth');

// Notification routes
router.get('/', authMiddleware.verifyToken, notificationController.getNotifications);
router.put('/:id/read', authMiddleware.verifyToken, notificationController.markAsRead);
router.put('/read-all', authMiddleware.verifyToken, notificationController.markAllAsRead);
router.delete('/:id', authMiddleware.verifyToken, notificationController.deleteNotification);
router.get('/unread-count', authMiddleware.verifyToken, notificationController.getUnreadCount);

module.exports = router;
