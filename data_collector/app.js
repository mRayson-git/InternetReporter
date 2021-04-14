const { exec } = require("child_process");
const fs = require('fs');
const dns = require('dns');
const fetch = require('node-fetch');
const ping = require('ping');

let currDate = new Date();
let speedDir = './speed_data/';
let connectionDir = './connection_data/';

console.log(process.env.TZ);

setInterval(async () => {
    // Variables
    let today = new Date();
    const datestring = currDate.toLocaleDateString().replaceAll('/', '-');

    console.log(datestring);
    let speedFile = speedDir+datestring+'.txt';
    let connectivityFile = connectionDir+datestring+'.txt';

    // If its a new date make new folders for data
    if (today.toLocaleDateString() >= currDate.toLocaleDateString()) {
        currDate = today;
        iteration = 0;
        speedFile = speedDir+datestring+'.txt';
        connectivityFile = connectionDir+datestring+'.txt';
    }

    let res = await ping.promise.probe('www.google.com', {
        timeout: 2
    });

    // Add connectivity information to log file
    if (res.alive) {
        console.log(`Connected\n${today.toLocaleTimeString()}, 1\n`);
        fs.appendFileSync(connectivityFile, `${today.getTime()}, ${res.time}, 1\n`, err => {
            if (err) throw err;
        });
    } else {
        console.log('Not connected');
        fs.appendFileSync(connectivityFile, `${today.getTime()}, ${res.time}, 0\n`, err => {
            if (err) throw err;
        });
    }
}, 5000);


