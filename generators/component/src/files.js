'use strict';

var mkdirp = require('mkdirp');

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      this.fs.copyTpl(
          this.templatePath('**/*'),
          this.destinationPath('src/app/components/'+this.props.componentName),
          this
      );
    };
};
