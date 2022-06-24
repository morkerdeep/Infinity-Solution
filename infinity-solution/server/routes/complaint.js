var express = require('express');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var moment = require('moment')
 
router.get("/get_cinfo", (req, res) => {
    const sqlInsert = "SELECT CustomerName FROM CustomerMaster";
    con.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/get_pinfo", (req, res) => {
    const sqlInsert = "SELECT ProductName FROM ProductMaster";
    con.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.post("/add_complaint", (req, res) => {
    console.log(req.body)
    var today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sqlInsert = "INSERT INTO ComplaintMaster (ProductName, ComplaintName, Date, CustomerName) values(?, ?, ?, ?)";
    con.query(sqlInsert, [req.body.pname, req.body.complaint, today, req.body.cname], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/get-complaint",(req,res)=>{
    var sql="SELECT * FROM ComplaintMaster";
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

module.exports = router;