'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // setting defaults, component name and path settings
        let fullPath = this.props.componentName;
        let pathAsArray = fullPath.split('/');
        let componentName = pathAsArray[pathAsArray.length - 1];
        let parentName = null;
        let parentPath = null;
        let isDuplicate = false;
        // data to be passed to templates and used to get info
        const data = {
            'componentName': componentName,
            'componentNameCamel': _.camelCase(componentName),
            'controllerName': _.upperFirst(_.camelCase(componentName)),
            'componentModule': _.camelCase(componentName)
        };
        //if the component has no parent
        if (pathAsArray.length === 1) {
          try {
            const indexModulesWriteLine = "require('./components/" + data.componentName + "/" + data.componentName + ".module').name,";
            utils.addToFile('index.components.js', indexModulesWriteLine, utils.COMPONENT_MARKER, this.destinationRoot() + '/src/app');
          } catch (err) {
              this.log('Could not generate this item due to missing file structure.');
              return;
          }
        } else {
            //if the component is nested in a parent component
            parentName = pathAsArray[pathAsArray.length - 2];
            // if single parent, join by '/' else join by '/components/' to nest within the parent components
            const joinString = (pathAsArray.length>2)?'/components/':'/';
            parentPath = _.join(pathAsArray.slice(0, pathAsArray.length - 1), joinString);
            fullPath = parentPath + '/components/' + data.componentName;
            // importing files to parent component
            try {
                //module
                const moduleImport = "import * as " + data.componentModule + " from './components/" + componentName + '/' + componentName + ".module';";
                utils.addToFile(parentName + '.module.js', moduleImport, utils.IMPORT_MODULE_MARKER, this.destinationRoot() + '/src/app/components/' + parentPath);
                //dependency
                const dependencyImport = "'" + data.componentModule + "',";
                utils.addToFile(parentName + '.module.js', dependencyImport, utils.IMPORT_DEPENDENCY_MARKER, this.destinationRoot() + '/src/app/components/' + parentPath);
            } catch (err) {
                this.log('Parent component files not found.');
                return;
            }
        }

        // checking if the module exists, if so it is a duplicate
        isDuplicate = utils.existsSync(this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.module.js'));

        // copy template files, no need for try and catch since file structure already exists from above
        this.fs.copyTpl(this.templatePath('_component.html'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component.html'), data);
        this.fs.copyTpl(this.templatePath('_component.scss'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component.scss'), data);
        this.fs.copyTpl(this.templatePath('_component.module.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.module.js'), data);
        this.fs.copyTpl(this.templatePath('_component.component.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component' + '.js'), data);
        this.fs.copyTpl(this.templatePath('_component.component-spec.js'), this.destinationPath(this.destinationRoot() + '/src/app/components/' + fullPath + '/' + data.componentName + '.component-spec' + '.js'), data);

        // Documenting the creation of the component
        if (!isDuplicate) {
          const file = this.destinationPath(this.destinationRoot() + '/docs/docs-assets/docs.json');
          jsonfile.readFile(file, function(err, docsJSON) {
            if (err) {
              this.log('Could not document this item due to missing or corrupted documentation file.');
              return;
            }
            const descriptionForDocs = (this.props.description && this.props.description.length>0)?this.props.description:data.componentName + " component";

            const componentDocJSON = {
              "name": data.componentName,
              "path": this.props.componentName,
              "components": [],
              "directives": [],
              "services": [],
              "description": descriptionForDocs
            };
            docsJSON.components.push(componentDocJSON);
            if (pathAsArray.length !== 1) {
              // Foreign Key String for component is injected into the parent component
              const componentDocForeignKeyJSON = {
                "path": this.props.componentName,
                "name": data.componentName
              };
              docsJSON.components[jsonQuery('components[path=' + pathAsArray.slice(0, -1).join('/') + ']', {data: docsJSON}).key].components.push(componentDocForeignKeyJSON);
            }
            jsonfile.writeFile(file, docsJSON, function(err) {}.bind(this));
          }.bind(this));
        }
    };
};
