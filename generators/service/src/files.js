var _ = require('lodash');
var utils = require('../../utils.js');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // setting defaults, service name and path settings
        var relPathAsArray = this.props.serviceName.split('/');
        var serviceName = relPathAsArray[relPathAsArray.length - 1];
        var fullPath;
        var parentName;
        var parentPath;
        // data to be passed to templates and used to get info
        var data = {
            'serviceName': serviceName,
            'serviceNameCamel': _.camelCase(serviceName)
        };
        // if the service has no parent, it is shared and belongs to the app
        if (relPathAsArray.length === 1) {
          var appRelPath = '/src/app/core/services';
          fullPath = this.destinationRoot() + '/src/app/core/services/' + data.serviceName;
            try {
                // import service into core module
                var coreModulesWriteLine = "import * as " + data.serviceNameCamel + 'Factory' + " from './services/" + data.serviceName + '/' + data.serviceName + ".factory';";
                utils.addToFile('core.module.js', coreModulesWriteLine, utils.IMPORT_SERVICE_MARKER, this.destinationRoot() + '/src/app/core');
                // add service to core module
                var addToModuleWriteLine = "shared.factory('" + data.serviceNameCamel + 'Factory' + "', " + data.serviceNameCamel + 'Factory' + ");";
                utils.addToFile('core.module.js', addToModuleWriteLine, utils.ADD_SERVICE_TOMODULE_MARKER, this.destinationRoot() + '/src/app/core');
            } catch (err) {
                this.log('Could not generate this item due to missing file structure.');
                return;
            }
        } else {
            // service within a component
            var appRelPath = '/src/app/components';
            parentName = relPathAsArray[relPathAsArray.length - 2];
            // if single parent, join by '/' else join by '/components/' to nest within the parent components
            var joinString = (relPathAsArray.length>2)?'/components/':'/';
            parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length - 1), joinString);
            fullPath = this.destinationRoot() + appRelPath + '/' + parentPath + '/services/' + data.serviceName;
            try {
                // import service into parent module
                console.log(appRelPath + '/' + parentPath);
                console.log(parentName);
                var importInParentModuleWriteLine = "import * as " + data.serviceNameCamel + 'Factory' + " from './services/" + data.serviceName + '/' + data.serviceName + ".factory';";
                utils.addToFile(parentName + '.module.js', importInParentModuleWriteLine, utils.IMPORT_SERVICE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
                // add service to parent module
                var addToParentModuleWriteLine = "componentModule.factory('" + data.serviceNameCamel + 'Factory' + "', " + data.serviceNameCamel + 'Factory' + ");";
                utils.addToFile(parentName + '.module.js', addToParentModuleWriteLine, utils.ADD_SERVICE_TOMODULE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
            } catch (err) {
                this.log('Parent component files not found.');
                return;
            }
        }
        // copying templates
        this.fs.copyTpl(this.templatePath('_service.factory.js'), this.destinationPath(fullPath + '/' + data.serviceName + '.factory.js'), data);
        // copy testing file
        this.fs.copyTpl(this.templatePath('_service.factory-spec.js'), this.destinationPath(fullPath + '/'  + data.serviceName + '.factory-spec.js'), data);

        // Documenting the creation of the service
        try{
          var descriptionForDocs = (this.props.description && this.props.description.length>0)?this.props.description:serviceName + " service";
          var serviceDocJSONString = '{"name": "' + data.serviceNameCamel + '", "path": "' + this.props.serviceName + '", "description": "' + descriptionForDocs + '"},';
          utils.addToFile(utils.DOCS_STORAGE_FILENAME, serviceDocJSONString, utils.SERVICE_MARKER, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
          // if the service has a parent, Link it to its parent
          if (parentPath) {
            // Foreign Key String for service is injected into the parent component
            var serviceDocForeignKeyJSONString = '{"path": "' + this.props.serviceName + '", "name": "' + data.serviceNameCamel + '"},';
            utils.addToFile(utils.DOCS_STORAGE_FILENAME, serviceDocForeignKeyJSONString, utils.SERVICE_NESTED_MARKER+" for "+parentPath, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
          }
        } catch (err) {
            this.log('Could not document this item due to missing documentation file.');
        }
    };
};
