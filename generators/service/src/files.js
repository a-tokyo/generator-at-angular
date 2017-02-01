'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // setting defaults, service name and path settings
        let relPathAsArray = this.props.serviceName.split('/');
        let serviceName = relPathAsArray[relPathAsArray.length - 1];
        let fullPath;
        let parentName;
        let parentPath;
        let isDuplicate = false;
        // data to be passed to templates and used to get info
        const data = {
            'serviceName': serviceName,
            'serviceNameCamel': _.camelCase(serviceName)
        };
        // if the service has no parent, it is shared and belongs to the app
        if (relPathAsArray.length === 1) {
          let appRelPath = '/src/app/core/services';
          fullPath = this.destinationRoot() + '/src/app/core/services/' + data.serviceName;
            try {
                // import service into core module
                const coreModulesWriteLine = "import * as " + data.serviceNameCamel + 'Factory' + " from './services/" + data.serviceName + '/' + data.serviceName + ".factory';";
                utils.addToFile('core.module.js', coreModulesWriteLine, utils.IMPORT_SERVICE_MARKER, this.destinationRoot() + '/src/app/core');
                // add service to core module
                const addToModuleWriteLine = "shared.factory('" + data.serviceNameCamel + 'Factory' + "', " + data.serviceNameCamel + 'Factory' + ");";
                utils.addToFile('core.module.js', addToModuleWriteLine, utils.ADD_SERVICE_TOMODULE_MARKER, this.destinationRoot() + '/src/app/core');
            } catch (err) {
                this.log('Could not generate this item due to missing file structure.');
                return;
            }
        } else {
            // service within a component
            let appRelPath = '/src/app/components';
            parentName = relPathAsArray[relPathAsArray.length - 2];
            // if single parent, join by '/' else join by '/components/' to nest within the parent components
            const joinString = (relPathAsArray.length>2)?'/components/':'/';
            parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length - 1), joinString);
            fullPath = this.destinationRoot() + appRelPath + '/' + parentPath + '/services/' + data.serviceName;
            try {
                // import service into parent module
                const importInParentModuleWriteLine = "import * as " + data.serviceNameCamel + 'Factory' + " from './services/" + data.serviceName + '/' + data.serviceName + ".factory';";
                utils.addToFile(parentName + '.module.js', importInParentModuleWriteLine, utils.IMPORT_SERVICE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
                // add service to parent module
                const addToParentModuleWriteLine = "componentModule.factory('" + data.serviceNameCamel + 'Factory' + "', " + data.serviceNameCamel + 'Factory' + ");";
                utils.addToFile(parentName + '.module.js', addToParentModuleWriteLine, utils.ADD_SERVICE_TOMODULE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
            } catch (err) {
                this.log('Parent component files not found.');
                return;
            }
        }

        // checking if the service exists, if so it is a duplicate
        isDuplicate = utils.existsSync(this.destinationPath(fullPath + '/' + data.serviceName + '.factory.js'));

        // copying templates
        this.fs.copyTpl(this.templatePath('_service.factory.js'), this.destinationPath(fullPath + '/' + data.serviceName + '.factory.js'), data);
        // copy testing file
        this.fs.copyTpl(this.templatePath('_service.factory-spec.js'), this.destinationPath(fullPath + '/'  + data.serviceName + '.factory-spec.js'), data);

        // Documenting the creation of the service
        if (!isDuplicate) {
          const file = this.destinationPath(this.destinationRoot() + utils.DOCS_ASSETS_PATH+'/'+utils.DOCS_STORAGE_FILENAME);
          jsonfile.readFile(file, function(err, docsJSON) {
            if (err) {
              this.log('Could not document this item due to missing or corrupted documentation file.');
              return;
            }
            const descriptionForDocs = (this.props.description && this.props.description.length > 0)
              ? this.props.description
              : serviceName + " service";
            const serviceDocJSON = {
              "name": data.serviceNameCamel,
              "path": this.props.serviceName,
              "description": descriptionForDocs
            };
            docsJSON.services.push(serviceDocJSON);
            if (parentPath) {
              // Foreign Key String for service is injected into the parent component
              const serviceDocForeignKeyJSON = {
                "path": this.props.serviceName,
                "name": data.serviceNameCamel
              };
              docsJSON.components[jsonQuery('components[path=' + parentPath + ']', {data: docsJSON}).key].services.push(serviceDocForeignKeyJSON);
            }
            jsonfile.writeFile(file, docsJSON, function(err) {}.bind(this));
          }.bind(this));
        }
    };
};
