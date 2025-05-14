
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Protect routes
exports.verifyToken = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access this route'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: 'Not authorized to access this route'
    });
  }
};

// Admin middleware
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      error: true,
      message: 'Not authorized to access this route. Admin access required.'
    });
  }
};
