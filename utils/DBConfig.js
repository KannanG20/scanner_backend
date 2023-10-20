const mysql = require('mysql');
const dotenv = require('dotenv')

dotenv.config()


const user = process.env.SQL_USERNAME
const password = process.env.SQL_PASSWORD
const database = process.env.SQL_DATABASE
const host = process.env.HOST

const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });

module.exports = con