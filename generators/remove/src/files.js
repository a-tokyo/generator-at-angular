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
          if (pathAsArray.length === 1){
            let componentName = pathAsArray[pathAsArray.length - 1];
            try {
              const indexModulesRemoveLine = "require('./components/" + componentName + "/" + componentName + ".module').name,";
              utils.removeLineFromFile('index.components.js', indexModulesRemoveLine, this.destinationRoot() + '/src/app')
              utils.deleteDirRecursive(this.destinationRoot() + '/src/app/components/' + componentName);
            } catch (err) {
              console.log(err);
            }
          }else{
            // component is nested
          }
          break;
        case 'directive':
        let directiveName = pathAsArray[pathAsArray.length - 1];
        const data = {
          'directiveName': directiveName,
          'directiveNameCamel': _.camelCase(directiveName),
          'needsPartial': this.props.needsPartial
        }

        if (pathAsArray.length === 1) {
          let appRelPath = '/src/app/core/directives';
          let fullPath = this.destinationRoot() + appRelPath + '/' + data.directiveName;
          try {
            // import directive into core module
            const coreModulesRemoveLine = "import * as " + data.directiveNameCamel + 'Directive' + " from './directives/" + data.directiveName + '/' + data.directiveName + ".directive';";
            utils.removeLineFromFile('core.module.js', coreModulesRemoveLine, this.destinationRoot() + '/src/app/core');
            // add directive to core module
            const addToModuleRemoveLine = "shared.directive('" + data.directiveNameCamel + "', " + data.directiveNameCamel + 'Directive' + ");";
            utils.removeLineFromFile('core.module.js', addToModuleRemoveLine, this.destinationRoot() + '/src/app/core');

            utils.deleteDirRecursive(this.destinationRoot() + '/src/app/core/directives/' + directiveName);
          } catch (err) {
            console.log(err);
          }
        }
          break;
        case 'page':

          break;
        case 'service':

          break;
      }
    };
};
