const express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const con = require('./db');
const app = express();
const fileupload = require("express-fileupload");
const session = require('express-session');
const cookie = require('cookie-parser');

var complaint = require('./routes/complaint'); 
var mcq = require('./routes/mcq'); 
var login = require('./routes/login'); 
var bal_vibhag = require('./routes/balvibhag'); 
var school = require('./routes/school'); 
var ss = require('./routes/standard_subject'); 
var chapter = require('./routes/chapter'); 


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload())
app.use(cookie());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(express.static('public'))


con.connect(function(err){
  if(err)throw err;
  console.log("MySql Database Connected");
});

app.use(cors(({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
})));

app.use('/complaint', complaint);
app.use('/mcq', mcq);
app.use('/login', login);
app.use('/balvibhag', bal_vibhag);
app.use('/school', school);
app.use('/standard-subject', ss);
app.use('/chapter', chapter);

 
app.listen(3001, () => {
  console.log(`Server listening on 3001`);
});
