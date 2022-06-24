var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var multer = require('multer');
var fileup = require('express-fileupload');
var fs = require('fs');
var knex = require('knex');

var misFile = null
var upfi = null;
var book_image = null;
var video_image = null;

router.post("/get-nibandh-title",(req,res)=>{
    var sql="SELECT Title,nibandh_title_id FROM NibandhTitleMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-nibandh",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NibandhMaster (nibandh_title_id,Nibandh) VALUES(?,?)";
    con.query(sql,[req.body.nibandh_title_id,req.body.nibandh],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-notification",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NotificationMaster (name,date) VALUES(?,?)";
    con.query(sql,[req.body.name,req.body.date],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/get-std-schhol", (req, res) => {
    data = []
    let sql = "SELECT * FROM StandardMaster WHERE school_id = ?"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        // console.log(result)
        data.push(result)
    })

    sql = "SELECT language_id FROM LanguageMaster  WHERE language_type IN (SELECT school_language FROM SchoolMaster WHERE school_id = ?)"
    con.query(sql, [req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        data.push(result)
        // console.log(data)
        res.json(data)
    })
})

router.post("/add-nibandh-title", (req, res) => {
    console.log(req.body)
    let sql = "INSERT INTO NibandhTitleMaster (Title, language_id, standard_id, school_id) VALUES(?, ?, ?, ?)"
    con.query(sql, [req.body.title, req.body.language_id, req.body.standard_id, req.body.school_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.json(result)
    })
})

router.post("/add-school", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/2/' + upfi.name;

    con.query("SELECT school_id FROM SchoolMaster", (err, result) => {
        let len = 0
        let fname = "" + upfi.name;
        ind = fname.indexOf(".")
    
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

            const sql  = "INSERT INTO SchoolMaster (school_name, school_address, school_contact, school_image, school_language) VALUES(?, ?, ?, ?, ?)";
            con.query(sql, [req.body.school, req.body.address, req.body.contact, fname, req.body.language], (err, result) => {
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

router.get("/get-school/:id", (req, res) => {
    var id = req.params.id
    console.log(id)
    const sql = "SELECT school_image FROM SchoolMaster WHERE school_id = ?";
    con.query(sql, [id], (err, result) => {
        if(err){
            throw err
        }
        // var img = result[0].school_image
        // console.log(img)
        // const buffer = Buffer.from(img, "base64");
        res.send(result)
    })
})

const upload = multer({storage:multer.memoryStorage()});
router.post("/add-image", upload.single("file"), (req, res, next) => {
    
    var file = req.files.file;
    var p = __dirname + '/public/2/' + file.name;
    upfi = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})

router.post("/add-mis-image", upload.single("file"), (req, res, next) => {
    // console.log(req.files)
    var file = req.files.file;
    var p = __dirname + '/public/mis/' + file.name;
    misFile = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})

router.post("/add-title", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/mis/' + misFile.name;

    con.query("SELECT miscellaneousmaster_id FROM MiscellaneousTitleMaster", (err, result) => {
        let len = 0
        let fname = "" + misFile.name;
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

            const sql  = "INSERT INTO MiscellaneousTitleMaster (miscellaneousmaster_title, miscellaneousmaster_image, school_id, type) VALUES(?, ?, ?, ?)";
            con.query(sql, [req.body.title, fname, req.body.school_id, parseInt(req.body.type)], (err, result) => {
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


router.post("/add-nibandh-title",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NibandhTitleMaster (Title,language_id,standard_id,school_id) VALUES(?,?,?,?)";
    con.query(sql,[req.body.title,req.body.language_id,req.body.standard_id,req.body.school_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/get-book-sub",(req,res)=>{
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

router.post("/get-book-chap-mas",(req,res)=>{
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

router.post("/get-lang",(req,res)=>{
    var sql="SELECT school_language FROM SchoolMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result[0].school_language);
        res.json(result);
    })
});

router.post("/get-standard",(req,res)=>{
    data = []
    fac = []
    var sql="SELECT standard_id, standard, faculty FROM StandardMaster WHERE school_id = ?";
    con.query(sql, [req.body.school_id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        data.push(result)

        result.map((x) => {
            if(!fac.includes(x.faculty)){
                fac.push(x.faculty)
            }
        })
        data.push(fac)

        res.json(data);
    })
});


router.post("/add-book-image", upload.single("file"), (req, res, next) => {
    // console.log(req.files)
    var file = req.files.file;
    var p = __dirname + '/public/book/' + file.name;
    book_image = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})

router.post("/add-book", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/book/' + book_image.name;

    con.query("SELECT bookMaterial_id FROM BookMasterMaterial", (err, result) => {
        let len = 0
        let fname = "" + book_image.name;
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

            const sql  = "INSERT INTO BookMasterMaterial (faculty, standard_id, subject_id, chapter_master_id, book_pdf) VALUES(?, ?, ?, ?, ?)";
            con.query(sql, [req.body.faculty, req.body.standard_id, req.body.subject_id, req.body.chapter_master_id, fname], (err, result) => {
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

router.post("/add-video-image", upload.single("file"), (req, res, next) => {
    // console.log(req.files)
    var file = req.files.file;
    var p = __dirname + '/public/video/' + file.name;
    video_image = file
    file.mv(p, (err) => {
        if(err){
            console.log(err)
        }
    })
    
})

router.post("/add-video", (req, res) => {
    let Client = require('sftp-client-promise');
    let conn = new Client();
    var p = __dirname + '/public/video/' + video_image.name;

    con.query("SELECT videoMaterial_id FROM VideoMasterMaterial", (err, result) => {
        let len = 0
        let fname = "" + video_image.name;
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

            const sql  = "INSERT INTO VideoMasterMaterial (faculty, standard_id, subject_id, chapter_master_id, video_link, video_name, video_image) VALUES(?, ?, ?, ?, ?, ?, ?)";
            con.query(sql, [req.body.faculty, req.body.standard_id, req.body.subject_id, req.body.chapter_master_id, req.body.video_link, req.body.video_name, fname], (err, result) => {
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


router.get("/get-all-school",(req,res)=>{
    var sql="SELECT * FROM SchoolMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-school/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM SchoolMaster WHERE school_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-mis-title",(req,res)=>{
    var sql="SELECT * FROM MiscellaneousTitleMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-mis-title/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM MiscellaneousTitleMaster WHERE miscellaneousmaster_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-nibandh-title",(req,res)=>{
    var sql="SELECT * FROM NibandhTitleMaster ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-nibandh-title/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM NibandhTitleMaster WHERE nibandh_title_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-nibandh",(req,res)=>{
    var sql="SELECT * FROM NibandhMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-nibandh/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM NibandhMaster WHERE nibandh_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-book",(req,res)=>{
    var sql="SELECT * FROM BookMasterMaterial ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-book/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM BookMasterMaterial WHERE bookMaterial_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-video",(req,res)=>{
    var sql="SELECT * FROM VideoMasterMaterial ORDER BY standard_id";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-video/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM VideoMasterMaterial WHERE videoMaterial_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.get("/get-all-noti",(req,res)=>{
    var sql="SELECT * FROM NotificationMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.delete("/delete-noti/:id",(req,res)=>{
    var id = req.params.id
    var sql="DELETE FROM NotificationMaster WHERE notification_id = ?";
    con.query(sql, [id], (err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;
