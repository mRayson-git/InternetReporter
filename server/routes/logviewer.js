const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let logfiles = [];
    let mostRecent = '';
    let test = "test";
    fs.readdir('./../data_collector/connection_data', (err, files) => {
        files.forEach(file => {
            logfiles.push(file);
        });
        mostRecent = logfiles[logfiles.length-1];
        console.log(mostRecent);
        res.render('logviewer', {
            logfiles: logfiles,
            mostRecent: mostRecent
        });
    });
});

module.exports = router;