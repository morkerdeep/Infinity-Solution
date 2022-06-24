var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');

router.post("/get-ss", (req, res) => {
    console.log(req.body.school_id)
    let data = []
    let std = []
    let sql = "SELECT standard_id, standard FROM StandardMaster WHERE school_id = ?"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        res.json(result)
        // data.push(result)
        // result.map((x) => {
        //     std.push(x.standard_id)
        // })
    })
})

router.post("/get-sub", (req, res) => {
    console.log(req.body.standard)
    let sql = "SELECT subject_id, subject_master FROM SubjectMaster WHERE subject_id IN (SELECT subject_id FROM StandardWiseSubjectMaster WHERE standard_id = ?)";
    con.query(sql, [req.body.standard], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/add-chap", (req, res) => {
    let sql = "INSERT INTO ChapterMaster (standard_id, serial_number, chapter_title, author, subject_id) VALUES(?, ?, ?, ?, ?)";
    con.query(sql, [req.body.standard_id, req.body.sno, req.body.title, req.body.auth, req.body.subject_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/get-chap-mas", (req, res) => {
    let sql = "SELECT chapter_master_id, chapter_title FROM ChapterMaster WHERE standard_id = ?";
    con.query(sql, [req.body.standard], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/get-chap-det-mas", (req, res) => {
    let sql = "SELECT chapterdetails_master_id, title FROM ChapterDetailsMaster WHERE chapter_master_id = ?";
    con.query(sql, [req.body.chap_mas], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/add-chap-wise-topic", (req, res) => {
    let sql = "INSERT INTO ChapterWishTopicMaster (chapterdetails_master_id, chapter_master_id, standard_id) VALUES(?, ?, ?)";
    con.query(sql, [req.body.chapter_det_master, req.body.chapter_master, req.body.standard_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/std-wise-chap", (req, res) => {
    console.log(req.body.standard)
    let sql = "SELECT chapter_master_id, standard_id, chapter_title FROM ChapterMaster WHERE standard_id = ?";
    con.query(sql, [req.body.standard], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/get-lang", (req, res) => {
    let sql = "SELECT school_language FROM SchoolMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.post("/add-chap-del", (req, res) => {
    let sql = "INSERT INTO ChapterDetailsMaster (chapter_master_id, title, standard_id, type_chapter) VALUES(?, ?, ?, ?)";
    con.query(sql, [req.body.chap, req.body.title, req.body.std, req.body.type], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
    
})

router.get("/get-all-chap-det",(req,res)=>{
    var sql="SELECT * FROM ChapterDetailsMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-chap-det/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM ChapterDetailsMaster WHERE chapterdetails_master_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-chap",(req,res)=>{
    var sql="SELECT * FROM ChapterMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-chap/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM ChapterMaster WHERE chapter_master_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-chap-wise-topic",(req,res)=>{
    var sql="SELECT * FROM ChapterWishTopicMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-chap-wise-topic/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM ChapterWishTopicMaster WHERE chapterwish_topic_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;