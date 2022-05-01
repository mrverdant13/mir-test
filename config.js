require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiration: process.env.JWT_EXPIRATION || '1h',
  },
};

module.exports = config;
