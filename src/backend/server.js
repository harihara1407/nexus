
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const routes = require('./routes');
const config = require('./config/config');

// Connect to database
connectDB();

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../', config.UPLOAD_PATH)));

// API Routes
app.use('/api', routes);

// Serve static assets in production
if (config.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Internal Server Error',
    details: config.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
if (config.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Nexus backend server running on port ${PORT}`);
  });
}

module.exports = app;
