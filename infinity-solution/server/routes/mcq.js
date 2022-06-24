var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var multer = require('multer');
var fileup = require('express-fileupload');
var fs = require('fs');
var knex = require('knex');

router.post("/add_data", (req, res) => {
    console.log(req.body)
    const sqlInsert = "INSERT INTO MCQsQuestionMaster (mcqs_question_name, answer_one, answer_two, answer_three, answer_four, correctanswer, standard_id, subject_id, chapter_master_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(sqlInsert, [req.body.mcq_master_que, req.body.mcq_question_one, req.body.mcq_question_two, req.body.mcq_question_three, req.body.mcq_question_four, req.body.mcq_question_answer, req.body.standard_id, req.body.subject_id, req.body.chapter_master_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.post("/add_data_mcq_master", (req, res) => {
    console.log(req.body)
    const sqlInsert = "INSERT INTO MCQ_Master (mcq_question, mcq_question_one, mcq_question_two, mcq_question_three, mcq_question_four, mcq_answer, standard_id, subject_id) values(?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(sqlInsert, [req.body.mcq_master_id, req.body.mcq_question_one, req.body.mcq_question_two, req.body.mcq_question_three, req.body.mcq_question_four, req.body.mcq_question_answer, req.body.standard_id, req.body.subject_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.post("/get_info", (req, res) => {

    console.log(req.body)
    let data = []
    let std_id = []
    let sub_id = []
    let temp = []

    let sqlInsert = "SELECT standard_id, standard FROM StandardMaster WHERE school_id = ?";
    con.query(sqlInsert, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        result.map((x) => {
            std_id.push(x.standard_id)
        })
        std_id = Array.from(new Set(std_id)) 
        console.log("std", std_id)
        data.push(result)
        res.json(result)
    })
})

router.post("/get-sub",(req,res)=>{
    var sql="SELECT * FROM SubjectMaster WHERE subject_id IN (SELECT subject_id FROM StandardWiseSubjectMaster WHERE standard_id = ?)";
    con.query(sql, [req.body.standard], (err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/get-chap",(req,res)=>{
    var sql="SELECT chapter_master_id, chapter_title FROM ChapterMaster WHERE subject_id = ?";
    con.query(sql, [req.body.subject_id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/std-wise-subject", (req, res) => {
    console.log(req.body)
    let sub_ids = []

    let sqlInsert = "SELECT subject_id FROM StandardWiseSubjectMaster WHERE standard_id = ?";
    con.query(sqlInsert, [req.body.standard], (err, result) => {
        if(err){
            throw err;
        }

        result.map((x) => {
            sub_ids.push(x.subject_id)
        })
        console.log(sub_ids)
    })

    sqlInsert = "SELECT subject_id, subject_master FROM SubjectMaster";
    con.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        }
        
        let temp = []
        result.map((x) => {
            if(sub_ids.includes(x.subject_id)){
                temp.push(x);
            }
        })
        res.json(temp)
    })

})

router.post("/get_lang", (req, res) => {
    console.log(req.body)
    const sqlInsert = "SELECT school_language FROM SchoolMaster WHERE school_id = ?";
    con.query(sqlInsert, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/get-all-mcq",(req,res)=>{
    var sql="SELECT * FROM MCQ_Master ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-mcq/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM MCQ_Master WHERE mcq_master_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-mcqque",(req,res)=>{
    var sql="SELECT * FROM MCQsQuestionMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-mcqque/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM MCQsQuestionMaster WHERE mcqs_question_master_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;