'use strict';

var mkdirp = require('mkdirp');

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      this.fs.copy(
          this.templatePath('**/*'),
          this.destinationPath('src/app/components/'+this.props.componentName)
      );
    };

};
