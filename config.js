require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
};

module.exports = config;
