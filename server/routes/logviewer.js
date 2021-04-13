const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let logfiles = [];
    let test = "test"
    fs.readdir('./', (err, files) => {
        console.log(files);
    });
    fs.readdir('./../data_collector/connection_data', (err, files) => {
        files.forEach(file => {
            logfiles.push(file);
        });
    });
    res.render('logviewer', {
        logfiles: logfiles
    });
});

module.exports = router;