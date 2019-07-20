const fse = require('fs-extra');
const config = require('../config/componenttemplate.js');
const componentname = process.argv[2];
const folder = './src/components/' + componentname + '/';
var fileTypes = ['js', 'css', 'vue'];
let file = folder + componentname + '.js';
for(let i in fileTypes) {
    let filetype = fileTypes[i];
    file = folder + componentname + '.'+filetype;
    fse.outputFile(file, config[filetype]).then(
        () => {
            console.log('sucessfully created'+file)
            fse.readFile(file, 'utf8')
        }).catch(err => {
            console.error(err)
        })
}