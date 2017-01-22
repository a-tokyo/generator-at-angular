var _ = require('lodash');
var utils = require('../../utils.js');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // setting defaults, component name and path settings
        var fullPath = this.props.componentName;
        var pathAsArray = fullPath.split('/');
        var componentName = pathAsArray[pathAsArray.length - 1];
        var parentComponentName = null;
        var parentPath = null;
        var data = {
            'componentName': componentName,
            'componentNameCamel': _.camelCase(componentName),
            'controllerName': _.upperFirst(_.camelCase(componentName)),
            'componentModule': _.camelCase(componentName)
        };
        //if the component has no parent
        if (pathAsArray.length === 1) {
            var indexModulesWriteLine = "require('./components/" + data.componentName + "/" + data.componentName + ".module').name,";
            utils.addToFile('index.components.js', indexModulesWriteLine, utils.COMPONENT_MARKER, this.destinationRoot() + '/src/app');
        } else {
            //if the component is nested in a parent component
            // setting defaults extra, component name and path settings
            parentComponentName = pathAsArray[pathAsArray.length - 2];
            parentPath = _.join(pathAsArray.slice(0, pathAsArray.length - 1), '/');
            fullPath = parentPath + '/components/' + data.componentName;
            //writing imports to files
            try {
                //module
                var moduleImport = "import * as " + data.componentModule + " from './components/" + componentName + '/' + componentName + ".module';";
                utils.addToFile(parentComponentName + '.module.js', moduleImport, utils.IMPORT_MODULE_MARKER, this.destinationRoot() + '/src/app/components/' + parentPath);
                //style
                var styleImport = "import './components/" + componentName + "/" + componentName + ".component.scss';";
                utils.addToFile(parentComponentName + '.module.js', styleImport, utils.IMPORT_STYLE_MARKER, this.destinationRoot() + '/src/app/components/' + parentPath);
                //dependency
                var dependencyImport = "'" + data.componentModule + "',";
                utils.addToFile(parentComponentName + '.module.js', dependencyImport, utils.IMPORT_DEPENDENCY_MARKER, this.destinationRoot() + '/src/app/components/' + parentPath);
            } catch (err) {
                this.log('Parent component files not found.');
                return;
            }
        }

        // Copy template files
        this.fs.copyTpl(this.templatePath('_component.html'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component.html'), data);
        this.fs.copyTpl(this.templatePath('_component.scss'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component.scss'), data);
        this.fs.copyTpl(this.templatePath('_component.module.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.module.js'), data);
        this.fs.copyTpl(this.templatePath('_component.component.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component' + '.js'), data);
        this.fs.copyTpl(this.templatePath('_component.component-spec.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component-spec' + '.js'), data);

        // Documenting the creation of the component
        // Extending the nested Line marker with information about the component in order to insert there later
        var nestedLineMarkExtension = " for "+fullPath;
        var componentDocJSONString = '{\n\t\t"name": "' + data.componentName + '", "path": "' + fullPath + '",\n\t\t"components": [\n\t\t\t'+utils.COMPONENT_NESTED_MARKER+nestedLineMarkExtension+'\n\t\t],\n\t\t"directives": [\n\t\t\t'+utils.DIRECTIVE_NESTED_MARKER+nestedLineMarkExtension+'\n\t\t],\n\t\t"services": [\n\t\t\t'+utils.SERVICE_NESTED_MARKER+nestedLineMarkExtension+'\n\t\t],\n\t\t"description": "Test component"\n\t\t},'
        utils.addToFile(utils.DOCS_STORAGE_FILENAME, componentDocJSONString, utils.COMPONENT_MARKER, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
        //if the component has no parent
        if (pathAsArray.length !== 1) {
          var componentDocForeignKeyJSONString = '{"path": "' + fullPath + '", "name": "' + data.componentName + '"},';
          console.log(utils.COMPONENT_NESTED_MARKER+" for "+parentPath);
          utils.addToFile(utils.DOCS_STORAGE_FILENAME, componentDocForeignKeyJSONString, utils.COMPONENT_NESTED_MARKER+" for "+parentPath, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
        }
    };
};
