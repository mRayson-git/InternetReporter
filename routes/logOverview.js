const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/files', (req, res) => {
    let logfiles = [];
    try {
        fs.readdir('./bash_scripts/logfiles', (err, files) => {
            files.forEach(file => {
                logfiles.push(file);
            });
            if (logfiles.length == 0) {
                res.json({ success: 2, message: "No logfiles to be retreived" });
            } else {
                res.json({ success: 1, message: "Logfiles have been retreived", payload: logfiles });
            }
        });
    } catch (err) {
        res.json( { success: 0, message: err });
    }
    
});

router.get('/data/:fileName', (req, res) => {
    try {
        let fulllog = [];
        let anomalousLogs = [];
        fs.readFile('./bash_scripts/logfiles/' + req.params.fileName, 'utf-8', (err, data) => {
            if (err) {
                console.log("error:" + err);
            } else {
                // Split into individual logs
                const logs = data.split('\n');
                let pastTime = 0;
                console.log("Logs: " + logs[0]);
                logs.forEach(log => {
                    let completedLog = [];
                    if (log.length > 0) {
                        // Split on spaces
                        log = log.split(' ');
            
                        // Get timestamp
                        let timestamp = log[0];
                        timestamp = timestamp.split('.')[0]
                        timestamp = timestamp.replace('[', '');
                        timestamp = parseInt(timestamp) * 1000;
                        pastTime = timestamp;
                        // Get pingtime
                        let pingTime = log[8].split('=')[1]
            
                        // completedLog.push(new Date(timestamp).toLocaleTimeString());
                        completedLog.push(timestamp);
                        completedLog.push(parseFloat(pingTime))
                    } else {
                        anomalousLogs.push(new Date(pastTime + 30000).toLocaleTimeString());
                        completedLog.push(pastTime);
                        completedLog.push(999)
                    }
                    fulllog.push({time: completedLog[0], ping: completedLog[1]});
                });
            }
            res.json({ success: 1, message: "Successfully read the file", payload: fulllog });
        });
    } catch (err) {
        res.json({ success: 0, message: err });
    }
});

module.exports = router;