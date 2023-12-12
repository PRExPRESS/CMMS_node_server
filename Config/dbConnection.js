const mysql = require('mysql');
const dotenv = require('dotenv').config();
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

module.exports = connection;