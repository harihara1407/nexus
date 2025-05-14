
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'nexus-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'nexus-refresh-secret-key',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@nexus.com',
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
