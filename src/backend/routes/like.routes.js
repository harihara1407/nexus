
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');
const authMiddleware = require('../middleware/auth');

// Like routes
router.post('/post/:postId', authMiddleware.verifyToken, likeController.likePost);
router.delete('/post/:postId', authMiddleware.verifyToken, likeController.unlikePost);
router.get('/post/:postId', authMiddleware.verifyToken, likeController.getPostLikes);
router.post('/comment/:commentId', authMiddleware.verifyToken, likeController.likeComment);
router.delete('/comment/:commentId', authMiddleware.verifyToken, likeController.unlikeComment);

module.exports = router;
