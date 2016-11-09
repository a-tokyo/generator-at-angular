'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      // setting defaults, component name and path settings
      var fullPath = this.props.componentName;
      var pathAsArray = fullPath.split('/');
      var componentName = pathAsArray[pathAsArray.length-1];
      var data = {'componentName': componentName, 'componentNameCamel': _.camelCase(componentName), 'controllerName': _.upperFirst(_.camelCase(componentName)), 'componentModule': _.camelCase(this.props.componentModule)};
      //if the component has no parent
      if(pathAsArray.length===1) {
        var indexModulesWriteLine = "require('./components/"+data.componentName+"/"+data.componentName + ".module').name,";
        utils.addToFile("index.components.js",indexModulesWriteLine,utils.COMPONENT_MARKER,this.destinationRoot()+"/src/app");
      }
      else{
        //if the component is nested in a parent component
        // setting defaults extra, component name and path settings
        var parentComponentName = pathAsArray[pathAsArray.length-2];
        var parentPath = _.join(pathAsArray.slice(0, pathAsArray.length-1), '/');
        //writing imports to files
        //module
        var moduleImport = "import * as "+data.componentModule+" from './"+componentName+"/"+componentName+".module';";
        utils.addToFile(parentComponentName+".module.js",moduleImport,utils.IMPORT_MODULE_MARKER,this.destinationRoot()+"/src/app/components/"+parentPath);
        //style
        var styleImport = "import './"+componentName+"/"+componentName+".component.scss';";
        utils.addToFile(parentComponentName+".module.js",styleImport,utils.IMPORT_STYLE_MARKER,this.destinationRoot()+"/src/app/components/"+parentPath);
        //dependency
        var dependencyImport = "'"+ data.componentModule + "'";
        utils.addToFile(parentComponentName+".module.js",dependencyImport,utils.IMPORT_DEPENDENCY_MARKER,this.destinationRoot()+"/src/app/components/"+parentPath);
      }

      // Copy template files
      //this.destinationRoot()+
      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath(this.destinationRoot()+'/src/app/components/'+fullPath+'/'+data.componentName+'.component.html'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.scss'),
        this.destinationPath(this.destinationRoot()+'/src/app/components/'+fullPath+'/'+data.componentName+'.component.scss'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.module.js'),
        this.destinationPath(this.destinationRoot()+'/src/app/components/'+fullPath+'/'+data.componentName+'.module.js'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('component.component.js'),
        this.destinationPath(this.destinationRoot()+'/src/app/components/'+fullPath+'/'+data.componentName+'.component'+'.js'),
        data
      );

    };
};
