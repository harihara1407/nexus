
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth');

// Comment routes
router.get('/post/:postId', authMiddleware.verifyToken, commentController.getPostComments);
router.post('/', authMiddleware.verifyToken, commentController.createComment);
router.put('/:id', authMiddleware.verifyToken, commentController.updateComment);
router.delete('/:id', authMiddleware.verifyToken, commentController.deleteComment);
router.post('/:id/reply', authMiddleware.verifyToken, commentController.replyToComment);

module.exports = router;
