'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const _ = require("lodash");

// Defining Markers
exports.COMPONENT_MARKER = '// Add new components above';
exports.SERVICE_MARKER = '// Add new services above';
exports.PAGE_MARKER = '// Add new pages above';
exports.DIRECTIVE_MARKER = '// Add new directives above';

exports.COMPONENT_NESTED_MARKER = '// Add new nested components above';
exports.SERVICE_NESTED_MARKER = '// Add new nested services above';
exports.DIRECTIVE_NESTED_MARKER = '// Add new nested directives above';

exports.IMPORT_MODULE_MARKER = '// Add module imports above';
exports.IMPORT_STYLE_MARKER = '// Add style imports above';
exports.IMPORT_DIRECTIVE_MARKER = '// Add directive imports above';
exports.IMPORT_SERVICE_MARKER = '// Add service imports above';
exports.IMPORT_DEPENDENCY_MARKER = '// Add module dependencies above';

exports.ADD_DIRECTIVE_TOMODULE_MARKER = '// Add directive to module above';
exports.ADD_SERVICE_TOMODULE_MARKER = '// Add service to module above';

exports.MAIN_SCSS_MARKER = '// Add Main SCSS Above';
exports.ROUTE_MARKER = '// Add new routes above';
exports.STATE_MARKER = '// Add new states above';

exports.DOCS_ASSETS_PATH = '/docs/docs-assets';
exports.DOCS_STORAGE_FILENAME = 'docs.js';

// Defining utility functions

/*
 * writes a line to a file before a marker
 * takes as inputs the file name, line to add, marker, and full path
 */
exports.addToFile = function(filename,lineToAdd,beforeMarker,fullpathI){
    try {
        let fullPath = path.resolve(fullpathI,filename);
        let fileSrc = fs.readFileSync(fullPath,'utf8');

        let indexOf = fileSrc.indexOf(beforeMarker);
        let lineStart = fileSrc.substring(0,indexOf).lastIndexOf('\n') + 1;
        let indent = fileSrc.substring(lineStart,indexOf);
        fileSrc = fileSrc.substring(0,indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath,fileSrc);
        // console.log('Written data to files');
    } catch(e) {
      console.log('Could not write data to files');
      throw e;
    }
};

/*
 * checks if a given path exists synchronously
 */
exports.existsSync = function(path){
  return fs.existsSync(path);
};

exports.isHasPackage = function (obj) {
    return _.isObject(obj) && obj.package && obj.import !== false;
}

exports.stripPackageName = function (pkgName) {
    let regexp = /(.*?)@/;
    let match = pkgName.match(regexp);
    if (match) {
        return match[1];
    }
    return pkgName;
}
