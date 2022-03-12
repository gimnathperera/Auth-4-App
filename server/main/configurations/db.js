const mysql = require('mysql');
require('dotenv').config();

let dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  database: process.env.DB_NAME,
};

let dbconnection = mysql.createPool(dbConfig);

// Attempt to catch disconnects

dbconnection.on('connection', function (connection) {
  console.log('MySql connected...');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

module.exports = dbconnection;
