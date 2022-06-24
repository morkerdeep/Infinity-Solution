var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var multer = require('multer');
var fileup = require('express-fileupload');
var fs = require('fs');
var knex = require('knex');

let paper_image = null
let tt_image = null
let topic_mas_image = null


router.delete("/delete-standard/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM StandardMaster WHERE standard_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-standard",(req,res)=>{
    var sql="SELECT * FROM StandardMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-subject",(req,res)=>{
    var sql="SELECT * FROM SubjectMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-subject/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM SubjectMaster WHERE subject_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-sws",(req,res)=>{
    var sql="SELECT * FROM StandardWiseSubjectMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-sws/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM StandardWiseSubjectMaster WHERE standard_wise_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-quepaper",(req,res)=>{
    var sql="SELECT * FROM OldQusPaperMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-quepaper/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM OldQusPaperMaster WHERE paper_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-topic",(req,res)=>{
    var sql="SELECT * FROM TopicMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-topic/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM TopicMaster WHERE topic_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-yearpaper",(req,res)=>{
    var sql="SELECT * FROM OldPaperYearMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-yearpaper/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM OldPaperYearMaster WHERE paper_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-timetable",(req,res)=>{
    var sql="SELECT * FROM TimeTableMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-timetable/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM TimeTableMaster WHERE time_table_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-topic-heading",(req,res)=>{
    var sql="SELECT * FROM TopicHeadingMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-topic-heading/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM TopicHeadingMaster WHERE topic_heading_master_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-swadhyay",(req,res)=>{
    var sql="SELECT * FROM SwadhyayMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-swadhyay/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM SwadhyayMaster WHERE swadhyay_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-school",(req,res)=>{
    var sql="SELECT school_id,school_name FROM SchoolMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/add-standard",(req,res)=>{
    console.log(req.body);
    var sql="INSERT INTO StandardMaster (standard,faculty,school_id,type) VALUES (?,?,?,?)";
    con.query(sql,[req.body.standard, req.body.faculty, req.body.school_id, req.body.type],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json({message:"Success"});
    })
});

router.post("/add-sub", (req, res) => {
    console.log(req.body)
    const sqlInsert = "INSERT INTO SubjectMaster (subject_master, school_id) VALUES(?, ?)";
    con.query(sqlInsert, [req.body.subject, req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})


router.post("/get-ss", (req, res) => {
    let data = []
    let sql = "SELECT * FROM StandardMaster WHERE school_id = ?"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
    })

    sql = "SELECT * FROM SubjectMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
        res.json(data)
    })
})


router.post("/get-sp", (req, res) => {
    let data = []
    let sql = "SELECT * FROM StandardMaster WHERE school_id = ?"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
    })

    sql = "SELECT * FROM OldQusPaperMaster";
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
        res.json(data)
    })
})

router.post("/get-sl", (req, res) => {
    let data = []
    let sql = "SELECT * FROM StandardMaster WHERE school_id = ?"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
    })

    sql = "SELECT school_language FROM SchoolMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
        console.log(data)
        res.json(data)
    })
})



router.post("/add-swsm", (req, res) => {
    let sql = "INSERT INTO StandardWiseSubjectMaster (subject_id, standard_id) VALUES(?, ?)";
    con.query(sql, [req.body.subject, req.body.standard], (err, result) => {
        if(err){
            throw err;
        }
        res.json(result)
    })
})

router.post("/get-swadhyay-sub",(req,res)=>{
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

router.post("/get-swadhyay-chap-mas",(req,res)=>{
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

router.post("/add-swadhyay",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO SwadhyayMaster (swadhyay_qus,swadhyay_ans,subject_id,standard_id,chapter_master_id) VALUES(?,?,?,?,?)";
    con.query(sql,[req.body.swadhyay_que,req.body.swadhyay_ans,req.body.subject_id,req.body.standard_id,req.body.chapter_master_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-que-paper",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO OldQusPaperMaster (paper_year) VALUES(?)";
    con.query(sql,[req.body.date],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

const upload = multer({storage:multer.memoryStorage()});
router.post("/add-paper-img", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    var p = __dirname + '/public/paper/' + file.name;
    paper_image = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})


router.post("/add-paper", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/paper/' + paper_image.name;
    console.log(req.body)

    con.query("SELECT paper_id FROM OldPaperYearMaster", (err, result) => {
        let len = 0
        let fname = "" + paper_image.name;
        ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_pdf/" + fname;
        console.log(req.body)
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            const sql  = "INSERT INTO OldPaperYearMaster (paper_id, year_paper_pdf, standard_id) VALUES(?, ?, ?)";
            con.query(sql, [req.body.paper_id, fname, req.body.standard_id], (err, result) => {
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

router.post("/add-tt-img", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    var p = __dirname + '/public/tt/' + file.name;
    tt_image = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})


router.post("/add-tt", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/tt/' + tt_image.name;
    console.log(req.body)

    con.query("SELECT time_table_id FROM TimeTableMaster", (err, result) => {
        let len = 0
        let fname = "" + tt_image.name;
        ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_pdf/" + fname;
        console.log(req.body)
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            const sql  = "INSERT INTO TimeTableMaster (standard_id, file) VALUES(?,?)";
            con.query(sql, [req.body.standard_id, fname], (err, result) => {
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

router.post("/get-topic-heading-mas",(req,res)=>{
    console.log(req.body);
    var sql = "SELECT topic_heading_master_id, topic_heading_master_title FROM TopicHeadingMaster WHERE standard_id = ? AND school_id = ?";
    con.query(sql,[req.body.standard, req.body.school],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});


router.post("/add-topic-mas-img", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    var p = __dirname + '/public/topic_mas/' + file.name;
    topic_mas_image = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})


router.post("/add-topic-mas", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/topic_mas/' + topic_mas_image.name;
    let t;
    console.log(req.body)

    if(req.body.topic === "Textbooks" || req.body.topic === "પાઠ્ય-પુસ્તકો"){
        t = 1
    }
    else if(req.body.topic === "Children's Department" || req.body.topic === "બાળ વિભાગ"){
        t = 0
    }
    else if(req.body.topic === "MCQs" || req.body.topic === "MCQs"){
        t = 2
    }
    else if(req.body.topic === "Essay" || req.body.topic === "નિબંધ"){
        t = 4
    }
    else if(req.body.topic === "Blueprint" || req.body.topic === "બ્લુપ્રિન્ટ"){
        t = 3
    }

    con.query("SELECT topic_id FROM TopicMaster", (err, result) => {
        let len = 0
        let fname = "" + topic_mas_image.name;
        ind = fname.indexOf(".")
    
        len = result.length
    

        fname = fname.substring(0, ind) + "-" + len + fname.substring(ind, fname.length);
        console.log(fname)
        var r_path = "/home/crystalsa/public_html/School/uploads/standard_image/" + fname;
        console.log(req.body)
        

        conn.connect({
            host: 'crystalsalesandmarketing.com',
            username: 'crystalsa',
            password: 'Smart@8080',
        }).then(() => {
            return conn.sftp('fastPut', {localPath: p, remotePath: r_path})
        }).then(() => {
            console.log("done");

            const sql  = "INSERT INTO TopicMaster (topic_name, topic_image, standard_id, school_id, topic_heading_master_id, type) VALUES(?, ?, ?, ?, ?, ?)";
            con.query(sql, [req.body.topic, fname, req.body.standard_id, req.body.school_id, req.body.topic_heading_master_id, t], (err, result) => {
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

router.post("/get-stds",(req,res)=>{
    var sql="SELECT standard FROM StandardMaster WHERE school_id = ? AND standard_id = ?";
    con.query(sql,[req.body.school, req.body.standard],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-topic-heading",(req,res)=>{
    var sql="INSERT INTO TopicHeadingMaster (topic_heading_master_title,school_id,standard_id) VALUES (?,?,?)";
    con.query(sql,[req.body.topic_heading_master_title,req.body.school_id,req.body.standard_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

module.exports = router;
