'use strict';
const _ = require('lodash');
const utils = require("../../utils");

module.exports = function(AngularATGenerator) {

  // angular modules that are propmted as questions not in the angular modules selection phase
  const extraModules = [
    {
      key: 'ocLazyLoad',
      module: 'oc.lazyLoad',
      package: 'oclazyload'
    }
  ];

  let imports = [];

  let extractPackagesToImport = function(importList, props){
    _.forEach(props, function(prop) {
      if(_.isArray(prop)){
        extractPackagesToImport(importList, prop);
      }else{
        if (utils.isHasPackage(prop)) {
          importList.push(utils.stripPackageName(prop.package));
        }
      }
    });
  };

  /**
   * Compute Angular's module to load and format the dependency list to insert
   */
  AngularATGenerator.prototype.computeModules = function computeModules() {
    // ngModules holds angular modules from props
    let ngModules = this.props.angularModules.map(function(module) {
      return module.module;
    });
    // prepare extra angular module from extra quetions in props
    extraModules.forEach(function(item) {
      if (this.props[item.key]) {
        imports.push(item);
      }
    }.bind(this));
    // add extra angular modules to ngModules
    imports.forEach(function(mod) {
      if (mod.module) {
        ngModules.push(mod.module);
      }
    });
    // this.modulesDependencies to be read in index.vendor and index.module and imported
    this.modulesDependencies = ngModules.filter(_.isString).map(function(dependency) {
      return `'${dependency}'`;
    }).join(', \r\n\t\t');
  };

  /**
   * Prepare list for vendor imports
   */
  AngularATGenerator.prototype.prepareImportsList = function prepareImportsList() {
    // prepare the list of imports to feed to index.vendor
    this.importList = [];

    imports.forEach(function(mod) {
      if (mod.module && mod.package) {
        this.importList.push(mod.package);
      }
    }, this);

    extractPackagesToImport(this.importList, this.props);
  };

};
