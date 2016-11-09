'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var data = {'componentName': this.props.componentName, 'componentNameCamel': _.camelCase(this.props.componentName), 'controllerName': _.upperFirst(_.camelCase(this.props.componentName)), 'componentModule': _.camelCase(this.props.componentModule)};
      this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.html'),
      data
    );
      this.fs.copyTpl(
      this.templatePath('component.scss'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.scss'),
      data
    );
      this.fs.copyTpl(
      this.templatePath('component.module.js'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.module'+'.js'),
      data
    );
      this.fs.copyTpl(
      this.templatePath('component.component.js'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.component'+'.js'),
      data
    );
    var indexModulesWriteLine = "require('./components/"+this.props.componentName+"/"+this.props.componentName + ".module').name,";
    utils.addToFile("index.components.js",indexModulesWriteLine,utils.COMPONENT_MARKER,this.destinationRoot()+"/src/app");
    // var indexScssWriteLine = "@import '../../../app/components/"+this.props.componentName+"/"+this.props.componentName + ".scss';";
    // utils.addToFile("index.scss",indexScssWriteLine,utils.SCSS_MARKER,this.destinationRoot()+"/src/assets/styles/sass");
    };
};
