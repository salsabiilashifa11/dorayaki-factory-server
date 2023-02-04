require('dotenv').config();
const winston = require('winston');

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'database-3.cqjy1ve55cev.ap-southeast-1.rds.amazonaws.com',
    port: '',
    dialect: 'postgres',
    timezone: 'Asia/Jakarta',
    logging: winston.debug,
  },
  // test: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: 'postgres',
  //   timezone: 'Asia/Jakarta',
  //   logging: winston.debug,
  // },
  // production: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_production',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
};
