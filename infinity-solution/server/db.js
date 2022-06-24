var mysql = require('mysql');

// var host = "103.171.180.222";
// var user = "xdemo_scrane";
// var password = "4_qVSHzon";
// var database = "xdemo_scrane";
// var port = "3306";

var host = "103.171.180.222";
var user = "crystalsa_";
var password = "TK_2AwaIg";
var database = "crystalsa_db";
var port = "3306";

var con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port
});


module.exports = con;