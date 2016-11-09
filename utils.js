var path = require('path');
var fs = require('fs');
var _ = require("lodash");
var chalk = require('chalk');
_.str = require('underscore.string');
_.mixin(_.str.exports());


exports.COMPONENT_MARKER = "/* Add New COMPONENTS Above */";
exports.SERVICE_MARKER = "// Add new services above";
exports.PAGE_MARKER = "// Add new pages above";
exports.DIRECTIVE_MARKER = "// Add new directives above";

exports.SCSS_MARKER = "// Add Component SCSS Above";
exports.ROUTE_MARKER = "/* Add New Routes Above */";
exports.STATE_MARKER = "/* Add New States Above */";

exports.addToFile = function(filename,lineToAdd,beforeMarker,fullpathI){
    try {
      console.log('try write');
        var fullPath = path.resolve(fullpathI,filename);
        var fileSrc = fs.readFileSync(fullPath,'utf8');

        var indexOf = fileSrc.indexOf(beforeMarker);
        var lineStart = fileSrc.substring(0,indexOf).lastIndexOf('\n') + 1;
        var indent = fileSrc.substring(lineStart,indexOf);
        fileSrc = fileSrc.substring(0,indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath,fileSrc);
    } catch(e) {
      console.log(e);
    }
};

exports.test = function(){
  console.log('test');
};
