
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

// Make sure upload directory exists
const uploadDir = path.join(__dirname, '../../', config.UPLOAD_PATH);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, 'nexus-' + uniqueSuffix + fileExtension);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  
  // Check extension
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  
  // Check mime type
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

module.exports = upload;
