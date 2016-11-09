'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {

      var fullPath = this.props.componentName;
      var pathAsArray = fullPath.split('/');
      var componentName = pathAsArray[pathAsArray.length-1];
      var data = {'componentName': componentName, 'componentNameCamel': _.camelCase(componentName), 'controllerName': _.upperFirst(_.camelCase(componentName)), 'componentModule': _.camelCase(this.props.componentModule)};
      if(pathAsArray.length===1) {
        var indexModulesWriteLine = "require('./components/"+this.props.componentName+"/"+this.props.componentName + ".module').name,";
        utils.addToFile("index.components.js",indexModulesWriteLine,utils.COMPONENT_MARKER,this.destinationRoot()+"/src/app");
      }
      else{
        var moduleImport = "import * as "+data.componentModule+" from './"+componentName+".component';";
      //   var parentComponentName = pathAsArray[pathAsArray.length-2];
      //   var parentPath = _.join(Array.slice(pathAsArray, 0, pathAsArray.length-1), '/');
      //   utils.addToFile(parentComponentName+".module.js",moduleImport,utils.IMPORT_MODULE_MARKER,this.destinationRoot()+"/src/app/components"+parentPath);
      }
      
      // Copy template files
      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath('src/app/components/'+fullPath+'/'+data.componentName+'.html'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.scss'),
        this.destinationPath('src/app/components/'+fullPath+'/'+data.componentName+'.scss'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.module.js'),
        this.destinationPath('src/app/components/'+fullPath+'/'+data.componentName+'.module'+'.js'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.component.js'),
        this.destinationPath('src/app/components/'+fullPath+'/'+data.componentName+'.component'+'.js'),
        data
      );

    };
};
