'use strict';
const fs = require('fs-extra');
const jsonfile = require('jsonfile');

/*
 * debuging mode flag, set to true to enable dir logging and debug features
 */
exports.debugMode = true;
/*
 * logs something if the boolean value is true
 */
exports.logIf = function(valueToLog, canLog) {
  if (canLog) {
    console.log(valueToLog);
  }
};
/*
 * deletes a directory along with its files recursively
 */
exports.deleteDirRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        exports.deleteDirRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

exports.dummyComponentInDocs = function(docsFilePath) {
  let docsJSON = jsonfile.readFileSync(docsFilePath);
  const componentDocJSON = {
    'name': 'component',
    'path': 'component',
    'components': [],
    'directives': [],
    'services': [],
    'description': ''
  };
  docsJSON.components.push(componentDocJSON);
  jsonfile.writeFileSync(docsFilePath, docsJSON);
}
