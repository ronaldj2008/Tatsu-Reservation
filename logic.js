// declare modules and var
var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var rsvp;

// setup express server
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// connect to mySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Tatsu_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connect as id " + connection.threadId);
});

// set up to send html files to server
// homepage
app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname, "index.html"));
});
// make rsvp page
app.get("/rsvp", function(req, res) {
 res.sendFile(path.join(__dirname, "rsvp.html"));
});
// see tables
app.get("/table", function(req, res) {
 res.sendFile(path.join(__dirname, "tables.html"));
});

// set up to show all info
// json all rsvp's
app.get("/api/rsvp", function(req, res) {
  return res.json(rsvp);
});
 // json current tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// server to run main site
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
