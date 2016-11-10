'use strict';

var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var itemRelPath = this.props.directiveName;
      var relPathAsArray = itemRelPath.split('/');
      var directiveName = relPathAsArray[relPathAsArray.length-1];

      var data = {'directiveName': directiveName, 'directiveNameCamel': _.camelCase(directiveName), 'needsPartial': this.props.needsPartial};
      var fullPath;
      if(relPathAsArray.length===1) {
        var appRelPath = '/src/app/core/directives';
        fullPath = this.destinationRoot()+appRelPath+'/'+data.directiveName;

        if(this.props.needsPartial){
        this.fs.copyTpl(
        this.templatePath('directive.html'),
        this.destinationPath(fullPath+'/'+data.directiveName+'.html'),
        data
      );
        this.fs.copyTpl(
        this.templatePath('directive.scss'),
        this.destinationPath(fullPath+'/'+data.directiveName+'.scss'),
        data
      );
      }
        this.fs.copyTpl(
        this.templatePath('directive.directive.js'),
        this.destinationPath(fullPath+'/'+data.directiveName+'.directive'+'.js'),
        data
      );

      var coreModulesWriteLine = "require('./directives/"+data.directiveName+"/"+data.directiveName+".directive')(shared);";
      utils.addToFile("core.module.js",coreModulesWriteLine,utils.DIRECTIVE_MARKER,this.destinationRoot()+"/src/app/core");

    }else{
      var appRelPath = '/src/app/components';
      var parentName = relPathAsArray[relPathAsArray.length-2];
      var parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length-1), '/');
      fullPath = this.destinationRoot()+appRelPath+'/'+parentPath+'/directives/'+data.directiveName;

      this.fs.copyTpl(
      this.templatePath('componentDirective.directive.js'),
      this.destinationPath(fullPath+'/'+data.directiveName+'.directive'+'.js'),
      data
    );

    }



    };
};
