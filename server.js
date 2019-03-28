/* Merge the Arctic Web Map configuration onto the openstreetmap-carto
 * project file. If a `localconfig.js(on)` file exists, apply that next.
 * Then run the local kosmtik web server.
*/
const child = require('child_process');

let baseProject = "project.mml";

child.spawn(`${__dirname}/node_modules/.bin/kosmtik`, 
    ['serve', baseProject], {
        stdio: 'inherit'
    });
