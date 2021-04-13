const { time } = require('console');
const express = require('express');
const Chart = require('chart.js');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const logfile = req.query.logfile;
    console.log("Logfile:" + logfile);
    let logtimes = [];
    let logdata = [];
    let fulllog = [];
    let anomalousLogs = [];
    fs.readFile('./bash_scripts/logfiles/' + logfile, 'utf-8', (err, data) => {
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
                logtimes.push(completedLog[0]);
                logdata.push(completedLog[1])
                fulllog.push({time: completedLog[0], ping: completedLog[1]});
            });
            logtimes.pop(logtimes);
            logdata.pop(logtimes);
            anomalousLogs.pop();
            console.log(fulllog);
        }
        res.render('graph', {
            logtimes: logtimes,
            logdata: logdata,
            fulllog: fulllog,
            anomalousLogs: anomalousLogs
        });
    });
});

module.exports = router;