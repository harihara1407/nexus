
// Input validation middleware
exports.validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  // Username validation
  if (!username) {
    errors.push({ field: 'username', message: 'Username is required' });
  } else if (username.length < 3 || username.length > 30) {
    errors.push({ field: 'username', message: 'Username must be between 3 and 30 characters' });
  }

  // Email validation
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Email must be valid' });
    }
  }

  // Password validation
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: true,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  // Password validation
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: true,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
