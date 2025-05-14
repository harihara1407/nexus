
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const commentRoutes = require('./comment.routes');
const likeRoutes = require('./like.routes');
const friendRoutes = require('./friend.routes');
const notificationRoutes = require('./notification.routes');

// Define route endpoints
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/friends', friendRoutes);
router.use('/notifications', notificationRoutes);

// Test route
router.get('/ping', (req, res) => {
  res.json({ message: 'Nexus API is online!' });
});

module.exports = router;
