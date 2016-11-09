'use strict';

var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var data = {'directiveName': this.props.directiveName, 'directiveNameCamel': _.camelCase(this.props.directiveName), 'needsPartial': this.props.needsPartial};
      if(this.props.needsPartial){
      this.fs.copyTpl(
      this.templatePath('directive.html'),
      this.destinationPath(this.destinationRoot()+'/src/app/core/directives/'+data.directiveName+'/'+data.directiveName+'.html'),
      data
    );
      this.fs.copyTpl(
      this.templatePath('directive.scss'),
      this.destinationPath(this.destinationRoot()+'/src/app/core/directives/'+data.directiveName+'/'+data.directiveName+'.scss'),
      data
    );
    }
      this.fs.copyTpl(
      this.templatePath('directive.directive.js'),
      this.destinationPath(this.destinationRoot()+'/src/app/core/directives/'+data.directiveName+'/'+data.directiveName+'.directive'+'.js'),
      data
    );

    var coreModulesWriteLine = "require('./directives/"+data.directiveName+"/"+data.directiveName+".directive')(shared);";
    utils.addToFile("core.module.js",coreModulesWriteLine,utils.DIRECTIVE_MARKER,this.destinationRoot()+"/src/app/core");
    };
};
