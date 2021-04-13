const { time } = require('console');
const express = require('express');
const Chart = require('chart.js');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const logfile = req.query.logfile;
    console.log("Logfile:" + logfile);
    let time = [];
    let alive = [];
    let pings = [];
    let fixedLog = [];
    fs.readFile('./../data_collector/connection_data/' + logfile, 'utf-8', (err, data) => {
        if (err) {
            console.log("error:" + err);
        } else {
            // Split into individual logs
            let logs = data.split('\n');
            
            for (let log of logs) {
                if (log.length > 0) {
                    // split into separate sections
                    log = log.split(',');

                    // date
                    time.push(log[0]);

                    // ping
                    if (log[1].trim() == 'unknown') {
                        log[1] = 999;
                    } else {
                        log[1] = parseInt(log[1].trim());
                    }
                    pings.push(log[1]);
                    
                    // alive
                    log[2] = parseInt(log[2].trim());
                    alive.push(log[2]);

                    fixedLog.push(log);
                }
            }
            
        }
        console.log(fixedLog);
        res.render('graph', {
            time: time,
            alive: alive,
            pings: pings
        });
    });
});

module.exports = router;