const exec = require("child_process");
const fs = require('fs');

let currDate = new Date();
let speedDir = './speed_data/'
let connectionDir = './speed_data/'
let iteration = 0;

// Runs forever
while (true) {
    let today = new Date();
    // If its a new date make new folders for data
    if (today > currDate) {
        currDate = today;
        iteration = 0;
        fs.mkdirSync(speedDir+currDate.toLocaleDateString());
        fs.mkdirSync(connectionDir+currDate.toLocaleDateString());
    }
    // If its the tenth iteration do full check
    if (iteration % 10 == 0) {
        exec('speedtest -j > ')
    }
}