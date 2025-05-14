
const nodemailer = require('nodemailer');
const config = require('../config/config');

/**
 * Send email
 * @param {Object} options
 */
exports.sendEmail = async (options) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD
    }
  });

  // Define mail options
  const mailOptions = {
    from: `Nexus <${config.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  return info;
};
