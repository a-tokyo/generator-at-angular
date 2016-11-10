'use strict';

var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var relPathAsArray = this.props.directiveName.split('/');
      var directiveName = relPathAsArray[relPathAsArray.length-1];
      var fullPath;
      var data = {'directiveName': directiveName, 'directiveNameCamel': _.camelCase(directiveName), 'needsPartial': this.props.needsPartial};
      // if the directive has no parent, it is shared and belongs to the app
      if(relPathAsArray.length===1) {
        var appRelPath = '/src/app/core/directives';
        fullPath = this.destinationRoot()+appRelPath+'/'+data.directiveName;
        this.fs.copyTpl(
        this.templatePath('directive.directive.js'),
        this.destinationPath(fullPath+'/'+data.directiveName+'.directive'+'.js'),
        data
        );
        // add the directive to the core.modules file of shared directives
        var coreModulesWriteLine = "require('./directives/"+data.directiveName+"/"+data.directiveName+".directive')(shared);";
        utils.addToFile("core.module.js",coreModulesWriteLine,utils.DIRECTIVE_MARKER,this.destinationRoot()+"/src/app/core");
      }else{
        // if the directive has a parent component, it belongs to that component
        var appRelPath = '/src/app/components';
        var parentName = relPathAsArray[relPathAsArray.length-2];
        var parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length-1), '/');
        fullPath = this.destinationRoot()+appRelPath+'/'+parentPath+'/directives/'+data.directiveName;
        try{
        // import directive into controller
        var importInParentModuleWriteLine = "import * as "+ data.directiveNameCamel+ "Directive" +" from './directives/"+  data.directiveName +'/'+ data.directiveName + ".directive';";
        utils.addToFile(parentName+".module.js",importInParentModuleWriteLine,utils.IMPORT_DIRECTIVE_MARKER,this.destinationRoot()+appRelPath+'/'+parentPath);
        //add directive to parent module
        var addDirToParentModuleWriteLine = "componentModule.directive('"+ data.directiveNameCamel +"', " +data.directiveNameCamel+ "Directive" +");";
        utils.addToFile(parentName+".module.js",addDirToParentModuleWriteLine,utils.ADD_DIRECTIVE_TOMODULE_MARKER,this.destinationRoot()+appRelPath+'/'+parentPath);
        }catch(err){
          this.log('Parent component files not found.');
          return;
        }
        this.fs.copyTpl(
        this.templatePath('componentDirective.directive.js'),
        this.destinationPath(fullPath+'/'+data.directiveName+'.directive'+'.js'),
        data
        );
      }
      //Write view templates if needed
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

    };
};
