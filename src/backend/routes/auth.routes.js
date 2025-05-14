
const express = require('express');
const router = express.Router();
const { validateRegistration, validateLogin } = require('../middleware/validation');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

// Authentication routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authMiddleware.verifyToken, authController.getCurrentUser);
router.post('/logout', authMiddleware.verifyToken, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
