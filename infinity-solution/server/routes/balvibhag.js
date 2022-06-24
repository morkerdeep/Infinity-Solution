var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var multer = require('multer');
var fileup = require('express-fileupload');
var fs = require('fs');

var img = null
var alpha_img = null
var other_img = null

const upload = multer({storage:multer.memoryStorage()});
router.post("/add-bvimage", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    img = file;
    console.log(file)
    var p = __dirname + '/public/bal_vibhag/' + file.name;
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})

router.post("/add-balvibhag", (req, res) => {
    let sql = "";

    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/bal_vibhag/' + img.name;

    let s = "";
    if(req.body.type === '1'){
        s  = "SELECT id FROM BalvibhagEnglishNumberMaster";
    }
    else if(req.body.type === '2'){
        s  = "SELECT id FROM BalvibhagGujaratiNumberMaster";
    }
    else if(req.body.type === '3'){
        s  = "SELECT id FROM BalvibhagHindiNumberMaster";
    }
    con.query(s, (err, result) => {
        let len = 0
        let fname = "" + img.name;
        let ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_image/" + fname;
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            if(req.body.type === '1'){
                sql  = "INSERT INTO BalvibhagEnglishNumberMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '2'){
                sql  = "INSERT INTO BalvibhagGujaratiNumberMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '3'){
                sql  = "INSERT INTO BalvibhagHindiNumberMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            
            con.query(sql, [fname, req.body.texte, req.body.textg, req.body.texth], (err, result) => {
                if(err){
                    throw err;
                }
                res.json(result);
            })
        }).catch((err) => {
            console.log(err, 'catch error');
            conn.end();
        });

    })
    
})

router.post("/add-alpha-img", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    alpha_img = file;
    console.log(file)
    var p = __dirname + '/public/bal_vibhag/' + file.name;
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
})


router.post("/add-alpha", (req, res) => {
    let sql = "";

    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/bal_vibhag/' + alpha_img.name;

    let s = "";
    if(req.body.type === '1'){
        s  = "SELECT id FROM BalvibhagAlphabetMaster";
    }
    else if(req.body.type === '2'){
        s  = "SELECT id FROM BalVibhagGujratiAlpMaster";
    }
    else if(req.body.type === '3'){
        s  = "SELECT id FROM BalvibhagHindiAlphabetMaster";
    }
    con.query(s, (err, result) => {
        let len = 0
        let fname = "" + alpha_img.name;
        let ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_image/" + fname;
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            if(req.body.type === '1'){
                sql  = "INSERT INTO BalvibhagAlphabetMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '2'){
                sql  = "INSERT INTO BalVibhagGujratiAlpMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '3'){
                sql  = "INSERT INTO BalvibhagHindiAlphabetMaster (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            
            con.query(sql, [fname, req.body.texte, req.body.textg, req.body.texth], (err, result) => {
                if(err){
                    throw err;
                }
                res.json(result);
            })
        }).catch((err) => {
            console.log(err, 'catch error');
            conn.end();
        });

    })

})

router.post("/add-other-img", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    other_img = file;
    var r_path = "/home/crystalsa/public_html/School/uploads/standard_image/" + file.name;
    let newMode = 0o666;
    // console.log(file)
    var p = __dirname + '/public/bal_vibhag/' + file.name;
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
})


router.post("/add-other", (req, res) => {
    let sql = "";

    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/bal_vibhag/' + other_img.name;

    let s = "";
    if(req.body.type === '1'){
        s  = "SELECT id FROM BalvibhagAakarVibhag";
    }
    else if(req.body.type === '2'){
        s  = "SELECT id FROM BalvibhagFalVibhag";
    }
    else if(req.body.type === '3'){
        s  = "SELECT id FROM BalvibhagPanchiVibhag";
    }
    else if(req.body.type === '4'){
        s  = "SELECT id FROM BalvibhagPhulVibhag";
    }
    else if(req.body.type === '5'){
        s  = "SELECT id FROM BalvibhagPraniVibhag";
    }
    else if(req.body.type === '6'){
        s  = "SELECT id FROM BalvibhagRangVibhag";
    }
    else if(req.body.type === '7'){
        s  = "SELECT id FROM BalvibhagShakbhajiVibhag";
    }
    else if(req.body.type === '8'){
        s  = "SELECT id FROM BalvibhagVahanVibhag";
    }
    con.query(s, (err, result) => {
        let len = 0
        let fname = "" + other_img.name;
        let ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_image/" + fname;
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            if(req.body.type === '1'){
                sql  = "INSERT INTO BalvibhagAakarVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '2'){
                sql  = "INSERT INTO BalvibhagFalVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '3'){
                sql  = "INSERT INTO BalvibhagPanchiVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '4'){
                sql  = "INSERT INTO BalvibhagPhulVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '5'){
                sql  = "INSERT INTO BalvibhagPraniVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '6'){
                sql  = "INSERT INTO BalvibhagRangVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '5'){
                sql  = "INSERT INTO BalvibhagShakbhajiVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            else if(req.body.type === '6'){
                sql  = "INSERT INTO BalvibhagVahanVibhag (image, textOne, textTwo, textThree) VALUES(?, ?, ?, ?)";
            }
            
            con.query(sql, [fname, req.body.texte, req.body.textg, req.body.texth], (err, result) => {
                if(err){
                    throw err;
                }
                res.json(result);
            })
        }).catch((err) => {
            console.log(err, 'catch error');
            conn.end();
        });

    })
})

router.post("/get-all-digit",(req,res)=>{
    var sql = "";
    console.log(req.body.type)
    if(req.body.type === "1"){
        sql="SELECT * FROM BalvibhagEnglishNumberMaster";
    }
    else if(req.body.type === "2"){
        sql="SELECT * FROM BalvibhagGujaratiNumberMaster";
    }
    else{
        sql="SELECT * FROM BalvibhagHindiNumberMaster";
    }

    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/delete-digit",(req,res)=>{
    var sql = "";
    if(req.body.type === "1"){
        sql="DELETE FROM BalvibhagEnglishNumberMaster WHERE id = ?";
    }
    else if(req.body.type === "2"){
        sql="DELETE FROM BalvibhagGujaratiNumberMaster WHERE id = ?";
    }
    else{
        sql="DELETE FROM BalvibhagHindiNumberMaster WHERE id = ?";
    }

    con.query(sql, [req.body.id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});


router.post("/get-all-alpha",(req,res)=>{
    var sql = "";
    console.log(req.body.type)
    if(req.body.type === "1"){
        sql="SELECT * FROM BalvibhagAlphabetMaster";
    }
    else if(req.body.type === "2"){
        sql="SELECT * FROM BalVibhagGujratiAlpMaster";
    }
    else{
        sql="SELECT * FROM BalvibhagHindiAlphabetMaster";
    }

    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/delete-alpha",(req,res)=>{
    var sql = "";
    if(req.body.type === "1"){
        sql="DELETE FROM BalvibhagAlphabetMaster WHERE id = ?";
    }
    else if(req.body.type === "2"){
        sql="DELETE FROM BalVibhagGujratiAlpMaster WHERE id = ?";
    }
    else{
        sql="DELETE FROM BalvibhagHindiAlphabetMaster WHERE id = ?";
    }

    con.query(sql, [req.body.id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/get-all-other",(req,res)=>{
    var sql = "";
    console.log(req.body.type)
    if(req.body.type === "1"){
        sql="SELECT * FROM BalvibhagAakarVibhag";
    }
    else if(req.body.type === "2"){
        sql="SELECT * FROM BalvibhagFalVibhag";
    }
    else if(req.body.type === "3"){
        sql="SELECT * FROM BalvibhagPanchiVibhag";
    }
    else if(req.body.type === "4"){
        sql="SELECT * FROM BalvibhagPhulVibhag";
    }
    else if(req.body.type === "5"){
        sql="SELECT * FROM BalvibhagPraniVibhag";
    }
    else if(req.body.type === "6"){
        sql="SELECT * FROM BalvibhagRangVibhag";
    }
    else if(req.body.type === "7"){
        sql="SELECT * FROM BalvibhagShakbhajiVibhag";
    }
    else{
        sql="SELECT * FROM BalvibhagVahanVibhag";
    }

    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/delete-other",(req,res)=>{
    var sql = "";
    if(req.body.type === "1"){
        sql="DELETE FROM BalvibhagAakarVibhag WHERE id = ?";
    }
    else if(req.body.type === "2"){
        sql="DELETE FROM BalvibhagFalVibhag WHERE id = ?";
    }
    else if(req.body.type === "3"){
        sql="DELETE FROM BalvibhagPanchiVibhag WHERE id = ?";
    }
    else if(req.body.type === "4"){
        sql="DELETE FROM BalvibhagPhulVibhag WHERE id = ?";
    }
    else if(req.body.type === "5"){
        sql="DELETE FROM BalvibhagPraniVibhag WHERE id = ?";
    }
    else if(req.body.type === "6"){
        sql="DELETE FROM BalvibhagRangVibhag WHERE id = ?";
    }
    else if(req.body.type === "7"){
        sql="DELETE FROM BalvibhagShakbhajiVibhag WHERE id = ?";
    }
    else{
        sql="DELETE FROM BalvibhagVahanVibhag WHERE id = ?";
    }

    con.query(sql, [req.body.id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});
 
module.exports = router;
