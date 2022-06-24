var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var moment = require('moment');
var bcrypt = require('bcrypt');
var session;

router.post("/teacher-check", (req, res) => {
    console.log(req.body);
    let sqlInsert = "SELECT * FROM SchoolTeacher_Login WHERE school_teacher_contact = ? OR school_teacher_email = ?";
    con.query(sqlInsert, [req.body.uname, req.body.uname], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)

        if(result.length == 0){
            res.json([false, "0"]);
        }
        else{
            if(result[0].school_teacher_password === req.body.password){
                req.session.user = {username : req.body.uname, school_id : result[0].school_id};
                req.session.save();
                
                res.json([true, result[0].school_id]);
            }
            else{
                res.json([false, "inner"]);
            }
        }
    })
})

router.get("/get-session", (req, res) => {
    console.log(req.session)
    res.json(req.session.user)
})

router.get("/get-schools", (req, res) => {
    let sqlInsert = "SELECT school_id, school_name FROM SchoolMaster";
    con.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
})

router.post("/student-check", (req, res) => {
    console.log(req.body);
    let sqlInsert = "SELECT * FROM SchoolStudentLoginMaster WHERE school_student_contact_no = ? OR school_student_email = ?";
    con.query(sqlInsert, [req.body.uname, req.body.uname], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        if(result.length == 0){
            res.json(false);
        }
        else{
            // bcrypt.compare(result[0].school_teacher_password, req.body.password, (err, res) => {
            //     console.log(res);
            // }) 
            console.log("46", req.body.password, result[0].school_student_password)
            if(result[0].school_student_password === req.body.password){
                res.json(true);
            }
            else{
                res.json(false);
            }
        }
    })
})

router.post("/admin-check", (req, res) => {
    console.log(req.body);
    let sqlInsert = "SELECT * FROM AdminLoginMaster WHERE admin_name = ?";
    con.query(sqlInsert, [req.body.uname], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        if(result.length == 0){
            res.json(false);
        }
        else{
            if(result[0].admin_paasword === req.body.password){
                res.json(true);
            }
            else{
                res.json(false);
            }
        }
    })
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
    });
})

module.exports = router;