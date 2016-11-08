'use strict';

var mkdirp = require('mkdirp');

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.html'),
      this
    );
      this.fs.copyTpl(
      this.templatePath('component.scss'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.scss'),
      this
    );
      this.fs.copyTpl(
      this.templatePath('component.module.js'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.module'+'.js'),
      this
    );
      this.fs.copyTpl(
      this.templatePath('component.directive.js'),
      this.destinationPath('src/app/components/'+this.props.componentName+'/'+this.props.componentName+'.directive'+'.js'),
      this
    );
    };
};
