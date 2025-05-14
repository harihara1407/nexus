
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');
const uploadMiddleware = require('../middleware/upload');

// User routes
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);
router.post('/profile-picture', 
  authMiddleware.verifyToken, 
  uploadMiddleware.single('image'), 
  userController.uploadProfilePicture
);
router.get('/search/:query', authMiddleware.verifyToken, userController.searchUsers);
router.get('/suggestions', authMiddleware.verifyToken, userController.getUserSuggestions);

module.exports = router;
