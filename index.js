const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const con = require("./utils/DBConfig")
const dotenv = require('dotenv')

const AuthRoute = require("./routes/AuthRoute")
const DataRoute = require("./routes/DataRoute")

app.use(bodyParser.json());
app.use(cors())
dotenv.config()

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
con.query("SELECT * FROM codes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.use(AuthRoute)
app.use(DataRoute)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});