'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");

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
      this.templatePath('component.directive.js'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.directive'+'.js'),
      data
    );
    };
};
