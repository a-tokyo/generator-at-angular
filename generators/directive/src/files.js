var _ = require("lodash");
var utils = require("../../utils.js");

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // setting defaults, directive name and path settings
        var relPathAsArray = this.props.directiveName.split('/');
        var directiveName = relPathAsArray[relPathAsArray.length - 1];
        var fullPath;
        var parentName;
        var parentPath;
        // data to be passed to templates and used to get info
        var data = {
            'directiveName': directiveName,
            'directiveNameCamel': _.camelCase(directiveName),
            'needsPartial': this.props.needsPartial
        };
        // if the directive has no parent, it is shared and belongs to the app
        if (relPathAsArray.length === 1) {
            var appRelPath = '/src/app/core/directives';
            fullPath = this.destinationRoot() + appRelPath + '/' + data.directiveName;
            try {
                var coreModulesWriteLine = "require('./directives/" + data.directiveName + "/" + data.directiveName + ".directive')(shared);";
                utils.addToFile('core.module.js', coreModulesWriteLine, utils.DIRECTIVE_MARKER, this.destinationRoot() + '/src/app/core');
                this.fs.copyTpl(this.templatePath('_directive.directive.js'), this.destinationPath(fullPath + '/' + data.directiveName + '.directive' + '.js'), data);
            } catch (err) {
                this.log('Could not generate this item due to missing file structure.');
                return;
            }
        } else {
            // if the directive has a parent component, it belongs to that component
            var appRelPath = '/src/app/components';
            parentName = relPathAsArray[relPathAsArray.length - 2];
            parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length - 1), '/');
            fullPath = this.destinationRoot() + appRelPath + '/' + parentPath + '/directives/' + data.directiveName;
            try {
                // import directive into parent module
                var importInParentModuleWriteLine = "import * as " + data.directiveNameCamel + 'Directive' + " from './directives/" + data.directiveName + '/' + data.directiveName + ".directive';";
                utils.addToFile(parentName + '.module.js', importInParentModuleWriteLine, utils.IMPORT_DIRECTIVE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
                //add directive to parent module
                var addDirToParentModuleWriteLine = "componentModule.directive('" + data.directiveNameCamel + "', " + data.directiveNameCamel + 'Directive' + ");";
                utils.addToFile(parentName + '.module.js', addDirToParentModuleWriteLine, utils.ADD_DIRECTIVE_TOMODULE_MARKER, this.destinationRoot() + appRelPath + '/' + parentPath);
            } catch (err) {
                this.log('Parent component files not found.');
                return;
            }
            this.fs.copyTpl(this.templatePath('_componentDirective.directive.js'), this.destinationPath(fullPath + '/' + data.directiveName + '.directive' + '.js'), data);
        }
        // copy testing file
        this.fs.copyTpl(this.templatePath('_directive.directive-spec.js'), this.destinationPath(fullPath + '/' + data.directiveName + '.directive-spec.js'), data);
        // copy view templates if needed
        if (this.props.needsPartial) {
            this.fs.copyTpl(this.templatePath('_directive.html'), this.destinationPath(fullPath + '/' + data.directiveName + '.html'), data);
            this.fs.copyTpl(this.templatePath('_directive.scss'), this.destinationPath(fullPath + '/' + data.directiveName + '.scss'), data);
        }

        // Documenting the creation of the directive
        try{
          var directiveDocJSONString = '{"name": "' + directiveName + '", "nameCamel": "' + data.directiveNameCamel + '", "path": "' + this.props.directiveName + '", "description": "' + directiveName + ' directive"},';
          utils.addToFile(utils.DOCS_STORAGE_FILENAME, directiveDocJSONString, utils.DIRECTIVE_MARKER, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
          // if the directive has a parent, Link it to its parent
          if (parentPath) {
            // Foreign Key String for directive is injected into the parent component
            var directiveDocForeignKeyJSONString = '{"path": "' + this.props.directiveName + '", "name": "' + data.directiveNameCamel + '"},';
            utils.addToFile(utils.DOCS_STORAGE_FILENAME, directiveDocForeignKeyJSONString, utils.DIRECTIVE_NESTED_MARKER+" for "+parentPath, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
          }
        } catch (err) {
            this.log('Could not document this item due to missing documentation file.');
        }
    };
};
