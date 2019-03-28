// Render all .mml files to images using Carto and Mapnik.
// This avoids kosmtik.
const carto  = require('carto');
const fs     = require('fs');
const glob   = require('glob');
const mapnik = require('mapnik');
const path   = require('path');

mapnik.register_default_fonts();
mapnik.register_system_fonts();
mapnik.register_default_input_plugins();

fs.mkdirSync("renders", { recursive: true });

new Promise((resolve, reject) => {
    glob("*.mml", (err, files) => {
        if (err) {
            reject(err);
        } else {
            resolve(files);
        }
    });    
})
.then((files) => {
    return Promise.all(files.map((file) => {
        return new Promise((resolve, reject) => {
            let basename = path.basename(file, ".mml");
            let data = fs.readFileSync(file, 'utf-8');
            let mml = new carto.MML({});

            mml.load(path.dirname(file), data, (err, mmlData) => {
                if (err) {
                    reject(err);
                } else {
                    let output = new carto.Renderer({
                        filename: file
                    }).render(mmlData);

                    // Logging for Carto
                    if (output.msg) {
                      output.msg.forEach((v) => {
                        if (v.type === 'error') {
                            console.error(carto.Util.getMessageToPrint(v));
                        } else if (v.type === 'warning') {
                            console.warn(carto.Util.getMessageToPrint(v));
                        }
                      });
                    }

                    resolve([basename, output.data]);
                }
            })
        });
    }));
})
.then((xmlDataItems) => {
    return Promise.all(xmlDataItems.map((pair) => {
        let basename = pair[0];
        let xml      = pair[1];

        return new Promise((resolve, reject) => {
            let map = new mapnik.Map(512, 512);

            map.fromString(xml, (err, map) => {
                if (err) {
                    reject(err);
                } else {
                    map.zoomAll();
                    let img = new mapnik.Image(512, 512);
                    map.render(img, (err, img) => {
                        if (err) {
                            reject(err);
                        } else {
                            img.encode("jpeg", (err, buffer) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    fs.writeFileSync(`renders/${basename}.jpg`, buffer);
                                }
                            })
                        }
                    })
                }
            });
        });
    }));
})
.catch((err) => {
    console.error(err);
});
