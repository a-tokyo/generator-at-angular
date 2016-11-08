'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");
var utils = require("../../../utils.js");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      var data = {'serviceName': this.props.serviceName, 'serviceNameCamel': _.camelCase(this.props.serviceName)};

      this.fs.copyTpl(
      this.templatePath('service.factory.js'),
      this.destinationPath('src/app/core/services/'+data.serviceName+'.factory'+'.js'),
      data
    );
    var coreModulesWriteLine = "require('./services/"+data.serviceName+".factory"+"')(shared);";
    utils.addToFile("core.module.js",coreModulesWriteLine,utils.SERVICE_MARKER,this.destinationRoot()+"/src/app/core");
    };
};
