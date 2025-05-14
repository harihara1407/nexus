
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth');
const uploadMiddleware = require('../middleware/upload');

// Post routes
router.get('/', authMiddleware.verifyToken, postController.getAllPosts);
router.get('/feed', authMiddleware.verifyToken, postController.getFeed);
router.get('/:id', authMiddleware.verifyToken, postController.getPostById);
router.post('/', 
  authMiddleware.verifyToken,
  uploadMiddleware.array('media', 5), 
  postController.createPost
);
router.put('/:id', authMiddleware.verifyToken, postController.updatePost);
router.delete('/:id', authMiddleware.verifyToken, postController.deletePost);
router.post('/:id/save', authMiddleware.verifyToken, postController.savePost);
router.delete('/:id/save', authMiddleware.verifyToken, postController.unsavePost);
router.get('/saved', authMiddleware.verifyToken, postController.getSavedPosts);
router.get('/user/:userId', authMiddleware.verifyToken, postController.getUserPosts);

module.exports = router;
