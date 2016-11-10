'use strict';

var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var relPathAsArray = this.props.serviceName.split('/');
      var serviceName = relPathAsArray[relPathAsArray.length-1];
      var fullPath;
      var data = {'serviceName': serviceName, 'serviceNameCamel': _.camelCase(serviceName)};

      if(relPathAsArray.length===1){
        try{
        var coreModulesWriteLine = "require('./services/"+data.serviceName+".factory"+"')(shared);";
        utils.addToFile("core.module.js",coreModulesWriteLine,utils.SERVICE_MARKER,this.destinationRoot()+"/src/app/core");
        this.fs.copyTpl(
          this.templatePath('service.factory.js'),
          this.destinationPath(this.destinationRoot()+'/src/app/core/services/'+data.serviceName+'.factory'+'.js'),
          data
        );
      }catch(err){
        this.log('Could not generate this item due to missing file structure.');
      }
      }else{
      // service within a component
      var parentComponentName = pathAsArray[pathAsArray.length-2];
      var parentPath = _.join(pathAsArray.slice(0, pathAsArray.length-1), '/');
      fullPath = parentPath + "/services";
      try{
      var addToParentModuleWriteLine = "componentModule.factory('"+data.serviceNameCamel+"Factory"+"', "+data.serviceNameCamel+"Factory"+");";
      utils.addToFile(parentComponentName+".module.js",addToParentModuleWriteLine,utils.ADD_SERVICE_TOMODULE_MARKER,this.destinationRoot()+"/src/app/components/"+parentPath);

      var importInParentModuleWriteLine = "import * as "+ data.serviceNameCamel+ "Factory" +" from './services/"+  data.serviceNameCamel+ ".factory";
      utils.addToFile(parentComponentName+".module.js",importInParentModuleWriteLine,utils.IMPORT_SERVICE_MARKER,this.destinationRoot()+"/src/app/components/"+parentPath);
      }catch(err){
      this.log('Parent component files not found.');
      return;
      }
        this.fs.copyTpl(
          this.templatePath('componentService.factory.js'),
          this.destinationPath(this.destinationRoot()+'/src/app/components/'+fullPath+'/'+data.serviceName+'.factory'+'.js'),
          data
        );


    }

  };
};
