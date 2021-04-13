const { exec } = require("child_process");
const fs = require('fs');
const dns = require('dns');
const fetch = require('node-fetch');

let currDate = new Date();
let speedDir = './speed_data/';
let connectionDir = './connection_data/';

console.log(process.env.TZ);

setInterval(async () => {
    // Variables
    let today = new Date();
    const datestring = currDate.getFullYear() + '-' + currDate.getMonth() + '-' + currDate.getDay();
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

    // Check connectivity
    console.log('Checking connectivity...');
    let connected = await fetch('https://google.com').then(ok => {
        console.log('Done checking');
        return true;
    }).catch(err => {
        // console.log(err);
        return false;
    });

    // Add connectivity information to log file
    if (connected) {
        console.log(`Connected\n${today.toLocaleTimeString()}, true\n`);
        fs.appendFileSync(connectivityFile, `${today.toLocaleTimeString()}, true\n`, err => {
            if (err) throw err;
        });
    } else {
        console.log('Not connected');
        fs.appendFileSync(connectivityFile, `${today.toLocaleTimeString()}, false\n`, err => {
            if (err) throw err;
        });
    }

}, 5000);


