var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');
_.str = require('underscore.string');
_.mixin(_.str.exports());


exports.COMPONENT_MARKER = '/* Add New COMPONENTS Above */';
exports.SERVICE_MARKER = '// Add new services above';
exports.PAGE_MARKER = '// Add new pages above';
exports.DIRECTIVE_MARKER = '// Add new directives above';

exports.IMPORT_MODULE_MARKER = '// Add module imports above';
exports.IMPORT_STYLE_MARKER = '// Add style imports above';
exports.IMPORT_SERVICE_MARKER = '// Add service imports above';
exports.IMPORT_DEPENDENCY_MARKER = '// Add module dependencies above';

exports.IMPORT_DIRECTIVE_MARKER = '// Add directive imports above';
exports.ADD_DIRECTIVE_TOMODULE_MARKER = '// Add directive to module above';
exports.ADD_SERVICE_TOMODULE_MARKER = '// Add service to module above';

exports.MAIN_SCSS_MARKER = '// Add Main SCSS Above';
exports.ROUTE_MARKER = '/* Add New Routes Above */';
exports.STATE_MARKER = '/* Add New States Above */';

exports.addToFile = function(filename,lineToAdd,beforeMarker,fullpathI){
    try {
        var fullPath = path.resolve(fullpathI,filename);
        var fileSrc = fs.readFileSync(fullPath,'utf8');

        var indexOf = fileSrc.indexOf(beforeMarker);
        var lineStart = fileSrc.substring(0,indexOf).lastIndexOf('\n') + 1;
        var indent = fileSrc.substring(lineStart,indexOf);
        fileSrc = fileSrc.substring(0,indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath,fileSrc);
        console.log('Written data to files');
    } catch(e) {
      console.log('Could not write data to files');
      throw e;
    }
};
