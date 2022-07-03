var express = require('express');
var router = express.Router();
const path = require('path');
let fs = require("fs");
let morgan = require('morgan');

uploadModel = require('../models/upload');

router.use(morgan('dev'));

router.route('/').post((req, res) => {
    let fbytes = req.headers["content-length"];
    let fname = req.headers["x_filename"];

    let upbytes = 0;

    newfile = fs.createWriteStream("copy." + fname);

    req.on('data', stuff => {
        upbytes += stuff.length;
        let progress = (upbytes / fbytes) * 100;
        console.log("progress: " + parseInt(progress, 10) + "%\n");
        let good = newfile.write(stuff);
        if (!good) {
            console.log("Pause");
            req.pause();
        }
    });
    newfile.on('drain', () => {
        req.resume();
        console.log("Resume");
    });
    req.on('end', stuff => {
        res.end("Done");
        console.log("Uploaded");
        newfile.end();
    });
});

module.exports = router;



