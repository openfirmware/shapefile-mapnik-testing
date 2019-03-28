const child = require('child_process');
const fs    = require('fs');
const path  = require('path');

let args = process.argv.slice(2, process.argv.length);

let projectFile = args[0];
let outputFile = "renders/" + path.basename(projectFile, ".mml") + ".png";

fs.mkdirSync('renders', { recursive: true });

child.spawn(`${__dirname}/node_modules/.bin/kosmtik`, 
    ['export', '--output', outputFile,
     '--format', 'png8',
     projectFile], {
        stdio: 'inherit'
    });
