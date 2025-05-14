
const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');
const authMiddleware = require('../middleware/auth');

// Friend routes
router.get('/', authMiddleware.verifyToken, friendController.getFriends);
router.get('/requests', authMiddleware.verifyToken, friendController.getFriendRequests);
router.post('/request/:userId', authMiddleware.verifyToken, friendController.sendFriendRequest);
router.put('/request/:requestId/accept', authMiddleware.verifyToken, friendController.acceptFriendRequest);
router.put('/request/:requestId/reject', authMiddleware.verifyToken, friendController.rejectFriendRequest);
router.delete('/:friendId', authMiddleware.verifyToken, friendController.removeFriend);
router.get('/suggestions', authMiddleware.verifyToken, friendController.getFriendSuggestions);

module.exports = router;
