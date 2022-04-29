const chokidar = require('chokidar');
const { exec } = require("child_process")
const fs = require('fs');
const filename = '../server/app.js';
const time = new Date();

// Watching changes then rebuilding the react app and triggering the server nodedemon to reload
chokidar.watch('./src').on('change', (event, path) => {
    exec("npm run build", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);


        sleep(1000).then(() => {
            try {
                fs.utimesSync(filename, time, time);
            } catch (err) {
                fs.closeSync(fs.openSync(filename, 'w'));
            }
        })
    });
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}