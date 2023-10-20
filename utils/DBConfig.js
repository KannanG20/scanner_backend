const mysql = require('mysql');
const dotenv = require('dotenv')

dotenv.config()


const user = process.env.SQL_USERNAME
const password = process.env.SQL_PASSWORD
const database = process.env.SQL_DATABASE

console.log('User:', process.env.SQL_USERNAME);
console.log('Password:', process.env.SQL_PASSWORD);
console.log('Database:', process.env.SQL_DATABASE);

const con = mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database
  });

module.exports = con