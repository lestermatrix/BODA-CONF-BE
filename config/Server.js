const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const events = require("../src/events");
//const bearerToken = require('express-bearer-token');
//const oktaAuth = require('./auth');
//const {google} = require('googleapis');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "user-boda",
  password: "boda123",
  database: "BODA_CONF",
  port: "49153",
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  //.use(bearerToken())
  //.use(oktaAuth)  //to add authentication to api.
  .use(events(connection));

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
