'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

let itemFilesDeleted = false;

module.exports = function(AngularATGenerator) {

  AngularATGenerator.prototype.removeFiles = function removeFiles() {
    if (!this.props.confirmRemove) {
      this.log(this.props.itemName + ' was not removed.');
      return;
    }

    const pathAsArray = this.props.itemName.split('/');

    switch (this.props.type) {
      case 'component':
        let componentName = pathAsArray[pathAsArray.length - 1];
        if (pathAsArray.length === 1) {
          try {
            const indexModulesRemoveLine = `require('./components/${componentName}/${componentName}.module').name,`;
            utils.removeLineFromFile('index.components.js', indexModulesRemoveLine, `${this.destinationRoot()}/src/app`);
            utils.deleteDirRecursive(`${this.destinationRoot()}/src/app/components/${componentName}`);
            this.log(`/src/app/components/${componentName}` + ' was removed.');
          } catch (err) {
            this.log(err);
            return;
          }
        } else {
          try {
            // component is nested
            let parentTRUEPath = pathAsArray.slice(0, -1).join('/components/');
            let parentName = pathAsArray[pathAsArray.length - 2];
            let componentModule = _.camelCase(componentName);

            const moduleImportRemoveLine = `import * as ${componentModule} from './components/${componentName}/${componentName}.module';`;
            utils.removeLineFromFile(`${parentName}.module.js`, moduleImportRemoveLine, `${this.destinationRoot()}/src/app/components/${parentTRUEPath}`);
            //dependency
            const dependencyImportRemoveLine = `'${componentModule}',`;
            utils.removeLineFromFile(parentName + '.module.js', dependencyImportRemoveLine, `${this.destinationRoot()}/src/app/components/${parentTRUEPath}`);
            // Delete the directory
            utils.deleteDirRecursive(`${this.destinationRoot()}/src/app/components/${parentTRUEPath}/components/${componentName}`);
            this.log(`/src/app/components/${parentTRUEPath}/components/${componentName} was removed.`);
          } catch (err) {
            this.log(err);
            return;
          }
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
            this.log('/src/app/core/directives/' + directiveName + ' was removed.')
          } catch (err) {
            this.log(err);
            return;
          }
        } else {
          // if the directive has a parent component, it belongs to that component
          let appRelPath = '/src/app/components';
          let parentName = pathAsArray[pathAsArray.length - 2];
          let parentPath = pathAsArray.slice(0, -1).join('/components/');

          try {
            // import directive into parent module
            const importInParentModuleRemoveLine = "import * as " + directiveData.directiveNameCamel + 'Directive' + " from './directives/" + directiveData.directiveName + '/' + directiveData.directiveName + ".directive';";
            utils.removeLineFromFile(parentName + '.module.js', importInParentModuleRemoveLine, this.destinationRoot() + appRelPath + '/' + parentPath);
            // remove add directive to parent module
            const addDirToParentModuleRemoveLine = "componentModule.directive('" + directiveData.directiveNameCamel + "', " + directiveData.directiveNameCamel + 'Directive' + ");";
            utils.removeLineFromFile(parentName + '.module.js', addDirToParentModuleRemoveLine, this.destinationRoot() + appRelPath + '/' + parentPath);

            // remove the directory
            utils.deleteDirRecursive(this.destinationRoot() + appRelPath + '/' + parentPath + '/directives/' + directiveData.directiveName);
            this.log(appRelPath + '/' + parentPath + '/directives/' + directiveData.directiveName + ' was removed.')
          } catch (err) {
            this.log(err);
            return;
          }
        }
        break;
      case 'page':
        let pageName = this.props.itemName;
        try {
          const indexModulesRemoveLine = "require('./pages/" + pageName + "/" + pageName + ".module').name,";
          utils.removeLineFromFile('index.module.js', indexModulesRemoveLine, this.destinationRoot() + '/src/app');
          utils.deleteDirRecursive(this.destinationRoot() + '/src/app/pages/' + pageName);
          this.log('/src/app/pages/' + pageName + ' was removed.')
        } catch (err) {
          this.log(err);
          return;
        }
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
            this.log('/src/app/core/services/' + serviceName + ' was removed.')
          } catch (err) {
            this.log(err);
            return;
          }
        } else {
          // if the service has a parent component, it belongs to that component
          let appRelPath = '/src/app/components';
          let parentName = pathAsArray[pathAsArray.length - 2];
          let parentPath = pathAsArray.slice(0, -1).join('/components/');

          try {
            // import service into parent module
            const importInParentModuleRemoveLine = "import * as " + serviceData.serviceNameCamel + 'Factory' + " from './services/" + serviceData.serviceName + '/' + serviceData.serviceName + ".factory';";
            utils.removeLineFromFile(parentName + '.module.js', importInParentModuleRemoveLine, this.destinationRoot() + appRelPath + '/' + parentPath);
            // remove add service to parent module
            const addDirToParentModuleRemoveLine = "componentModule.factory('" + serviceData.serviceNameCamel + 'Factory' + "', " + serviceData.serviceNameCamel + 'Factory' + ");";
            utils.removeLineFromFile(parentName + '.module.js', addDirToParentModuleRemoveLine, this.destinationRoot() + appRelPath + '/' + parentPath);

            // remove the directory
            utils.deleteDirRecursive(this.destinationRoot() + appRelPath + '/' + parentPath + '/services/' + serviceData.serviceName);
            this.log(appRelPath + '/' + parentPath + '/services/' + serviceData.serviceName + ' was removed.')
          } catch (err) {
            this.log(err);
            return;
          }
        }
        break;
    }
    itemFilesDeleted = true;
  };

  AngularATGenerator.prototype.removeDocumentation = function removeDocumentation() {
    if (!this.props.confirmRemove || !itemFilesDeleted) {
      return;
    }
    // documentation remove logic
    const pathAsArray = this.props.itemName.split('/');
    const docsFile = this.destinationPath(this.destinationRoot() + utils.DOCS_ASSETS_PATH+'/'+utils.DOCS_STORAGE_FILENAME);
    // reading the docs JSON
    jsonfile.readFile(docsFile, function(err, docsJSON) {
      if (err) {
        this.log('Could not load the documentation file.');
        return;
      }
      // switching on type to remove
      switch (this.props.type) {
        case 'component':
          if (pathAsArray.length > 1) {
            let parentPath = pathAsArray.slice(0, -1).join('/');
            let parentCompElement = jsonQuery(`components[path=${parentPath}]`, {data: docsJSON});
            let nestedCompKey = jsonQuery(`components[path=${this.props.itemName}]`, {data: parentCompElement.value});
            docsJSON.components[parentCompElement.key].components.splice(nestedCompKey, 1);
          }
          let compElement = jsonQuery(`components[path=${this.props.itemName}]`, {data: docsJSON});
          removeCompDocs(compElement, docsJSON);
          this.log(this.props.itemName + "'s documentation was removed.");
          break;

        case 'directive':
          if (pathAsArray.length > 1) {
            let parentPath = pathAsArray.slice(0, -1).join('/');
            let parentCompElement = jsonQuery(`components[path=${parentPath}]`, {data: docsJSON});
            let nestedDirectiveKey = jsonQuery(`directives[path=${this.props.itemName}]`, {data: parentCompElement.value});
            docsJSON.components[parentCompElement.key].directives.splice(nestedDirectiveKey, 1);
          }
          docsJSON.directives.splice(jsonQuery(`directives[path=${this.props.itemName}]`, {data: docsJSON}).key, 1);
          this.log(this.props.itemName + "'s documentation was removed.");
          break;

        case 'page':
          docsJSON.pages.splice(jsonQuery(`pages[name=${this.props.itemName}]`, {data: docsJSON}).key, 1);
          this.log(this.props.itemName + "'s documentation was removed.");
          break;

        case 'service':
          if (pathAsArray.length > 1) {
            let parentPath = pathAsArray.slice(0, -1).join('/');
            let parentCompElement = jsonQuery(`components[path=${parentPath}]`, {data: docsJSON});
            let nestedServiceKey = jsonQuery(`services[path=${this.props.itemName}]`, {data: parentCompElement.value});
            docsJSON.components[parentCompElement.key].services.splice(nestedServiceKey, 1);
          }
          docsJSON.services.splice(jsonQuery(`services[path=${this.props.itemName}]`, {data: docsJSON}).key, 1);
          this.log(this.props.itemName + "'s documentation was removed.");
          break;

      }
      // writing back the docs JSON
      jsonfile.writeFile(docsFile, docsJSON, function(err) {}.bind(this));
    }.bind(this));
  };

  function removeCompDocs(compElement, docsJSON) {
    if(compElement.value){
      let nestedComps = (compElement.value.components);
      nestedComps.forEach(function(nestedComp) {
        let nestedCompElement = jsonQuery(`components[path=${nestedComp.path}]`, {data: docsJSON});
        let nestedCompKey = nestedCompElement.key;
        removeCompDocs(nestedCompElement, docsJSON);
        docsJSON.components.splice(nestedCompKey, 1)
      });

      let nestedDirectives = (compElement.value.directives);
      nestedDirectives.forEach(function(nestedDirective) {
        let nestedDirectiveKey = jsonQuery(`directives[path=${nestedDirective.path}]`, {data: docsJSON}).key;
        docsJSON.directives.splice(nestedDirectiveKey, 1)
      });

      let nestedServices = (compElement.value.services);
      nestedServices.forEach(function(nestedService) {
        let nestedServiceKey = jsonQuery(`services[path=${nestedService.path}]`, {data: docsJSON}).key;
        docsJSON.services.splice(nestedServiceKey, 1)
      });
    }
    docsJSON.components.splice(compElement.key, 1);
  }

};
