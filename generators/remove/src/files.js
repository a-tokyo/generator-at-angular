'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

module.exports = function(AngularATGenerator) {

  AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
    const pathAsArray = this.props.itemName.split('/');

    switch (this.props.type) {
      case 'component':
        if (pathAsArray.length === 1) {
          let componentName = pathAsArray[pathAsArray.length - 1];
          try {
            const indexModulesRemoveLine = "require('./components/" + componentName + "/" + componentName + ".module').name,";
            utils.removeLineFromFile('index.components.js', indexModulesRemoveLine, this.destinationRoot() + '/src/app')
            utils.deleteDirRecursive(this.destinationRoot() + '/src/app/components/' + componentName);
          } catch (err) {
            console.log(err);
          }
        } else {
          // component is nested
        }
        break;
      case 'directive':
        let directiveName = pathAsArray[pathAsArray.length - 1];
        const directiveData = {
          'directiveName': directiveName,
          'directiveNameCamel': _.camelCase(directiveName),
          'needsPartial': this.props.needsPartial
        };

        if (pathAsArray.length === 1) {
          let appRelPath = '/src/app/core/directives';
          let fullPath = this.destinationRoot() + appRelPath + '/' + directiveData.directiveName;
          try {
            // import directive into core module
            const coreModulesRemoveLine = "import * as " + directiveData.directiveNameCamel + 'Directive' + " from './directives/" + directiveData.directiveName + '/' + directiveData.directiveName + ".directive';";
            utils.removeLineFromFile('core.module.js', coreModulesRemoveLine, this.destinationRoot() + '/src/app/core');
            // add directive to core module
            const addToModuleRemoveLine = "shared.directive('" + directiveData.directiveNameCamel + "', " + directiveData.directiveNameCamel + 'Directive' + ");";
            utils.removeLineFromFile('core.module.js', addToModuleRemoveLine, this.destinationRoot() + '/src/app/core');

            utils.deleteDirRecursive(this.destinationRoot() + '/src/app/core/directives/' + directiveName);
          } catch (err) {
            console.log(err);
          }
        }
        break;
      case 'page':
        let pageName = this.props.itemName;
        const indexModulesRemoveLine = "require('./pages/" + pageName + "/" + pageName + ".module').name,";
        utils.removeLineFromFile('index.module.js', indexModulesRemoveLine, this.destinationRoot() + '/src/app');
        utils.deleteDirRecursive(this.destinationRoot() + '/src/app/pages/' + pageName);
        break;
      case 'service':
        let serviceName = pathAsArray[pathAsArray.length - 1];
        const serviceData = {
          'serviceName': serviceName,
          'serviceNameCamel': _.camelCase(serviceName)
        };
        if (pathAsArray.length === 1) {
          let appRelPath = '/src/app/core/services';
          let fullPath = this.destinationRoot() + appRelPath + '/' + serviceData.serviceName;
          try {
            // import service into core module
            const coreModulesRemoveLine = "import * as " + serviceData.serviceNameCamel + 'Factory' + " from './services/" + serviceData.serviceName + '/' + serviceData.serviceName + ".factory';";
            utils.removeLineFromFile('core.module.js', coreModulesRemoveLine, this.destinationRoot() + '/src/app/core');
            // add service to core module
            const addToModuleRemoveLine = "shared.factory('" + serviceData.serviceNameCamel + 'Factory' + "', " + serviceData.serviceNameCamel + 'Factory' + ");";
            utils.removeLineFromFile('core.module.js', addToModuleRemoveLine, this.destinationRoot() + '/src/app/core');
            utils.deleteDirRecursive(this.destinationRoot() + '/src/app/core/services/' + serviceName);
          } catch (err) {
            console.log(err);
          }
        }
        break;
    }
  };
};
