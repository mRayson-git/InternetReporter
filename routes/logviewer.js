const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let logfiles = [];
    let test = "test"
    fs.readdir('./bash_scripts/logfiles', (err, files) => {
        files.forEach(file => {
            logfiles.push(file);
        });
    });
    res.render('logviewer', {
        logfiles: logfiles
    });
});

module.exports = router;