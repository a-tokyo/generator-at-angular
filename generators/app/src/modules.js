'use strict';
const _ = require('lodash');
const utils = require("../../utils");

module.exports = function (AngularATGenerator) {

  const extraModules = [{ key: 'ocLazyLoad', module: 'oc.lazyLoad', package: 'oclazyload'}];

  let imports = [];
  /**
   * Compute Angular's module to load and format the dependency list to insert
   */
  AngularATGenerator.prototype.computeModules = function computeModules() {
    let ngModules = this.props.angularModules.map(function (module) {
      return module.module;
    });

    extraModules.forEach(function(item){
      if(this.props[item.key]){
        imports.push(item);
      }
    }.bind(this));

    imports.forEach(function (mod) {
      if (mod.module) {
        ngModules.push(mod.module);
      }
    });

    this.modulesDependencies = ngModules
      .filter(_.isString)
      .map(function (dependency) {
        return '\"' + dependency + '\"';
      })
      .join(', \r\n\t\t');
  };

  /**
   * Simplify the model to simplify access to angular modules from the templates
   */
  AngularATGenerator.prototype.prepareAngularModules = function prepareAngularModules() {
    this.angularModulesObject = {};

    this.props.angularModules.forEach(function (module) {
      this[module.key] = module.module;
    }, this.angularModulesObject);
  };

  /**
   * Prepare list for vendor imports
   */
  AngularATGenerator.prototype.prepareImportsList = function prepareImportsList() {

    this.importList = [];

    imports.forEach(function (mod) {
      if (mod.module && mod.package) {
        this.importList.push(mod.package);
      }
    }, this);

    this.props.forEach(function(section) {
      if (_.isArray(section)) {
        section.forEach(function(prop) {
          if (utils.isHasPackage(prop)) {
            this.importList.push(utils.stripPackageName(prop.package));
          }
        }, this);
      } else if (utils.isHasPackage(section)) {
        this.importList.push(utils.stripPackageName(section.package));
      }
    }.bind(this));

  };

};
