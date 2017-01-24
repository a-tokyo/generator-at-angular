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
        var isDuplicate = false;
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
                // import directive into core module
                var coreModulesWriteLine = "import * as " + data.directiveNameCamel + 'Directive' + " from './directives/" + data.directiveName + '/' + data.directiveName + ".directive';";
                utils.addToFile('core.module.js', coreModulesWriteLine, utils.DIRECTIVE_MARKER, this.destinationRoot() + '/src/app/core');
                // add directive to core module
                var addToModuleWriteLine = "shared.directive('" + data.directiveNameCamel + "', " + data.directiveNameCamel + 'Directive' + ");";
                utils.addToFile('core.module.js', addToModuleWriteLine, utils.ADD_DIRECTIVE_TOMODULE_MARKER, this.destinationRoot() + '/src/app/core');
            } catch (err) {
                this.log('Could not generate this item due to missing file structure.');
                return;
            }
        } else {
            // if the directive has a parent component, it belongs to that component
            var appRelPath = '/src/app/components';
            parentName = relPathAsArray[relPathAsArray.length - 2];
            // if single parent, join by '/' else join by '/components/' to nest within the parent components
            var joinString = (relPathAsArray.length>2)?'/components/':'/';
            parentPath = _.join(relPathAsArray.slice(0, relPathAsArray.length - 1), joinString);
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
        }

        // checking if the directive exists, if so it is a duplicate
        isDuplicate = utils.existsSync(this.destinationPath(fullPath + '/' + data.directiveName + '.directive' + '.js'));

        // copying templates
        this.fs.copyTpl(this.templatePath('_directive.directive.js'), this.destinationPath(fullPath + '/' + data.directiveName + '.directive' + '.js'), data);
        // copy testing file
        this.fs.copyTpl(this.templatePath('_directive.directive-spec.js'), this.destinationPath(fullPath + '/' + data.directiveName + '.directive-spec.js'), data);
        // copy view html and css templates if needed
        if (this.props.needsPartial) {
            this.fs.copyTpl(this.templatePath('_directive.html'), this.destinationPath(fullPath + '/' + data.directiveName + '.html'), data);
            this.fs.copyTpl(this.templatePath('_directive.scss'), this.destinationPath(fullPath + '/' + data.directiveName + '.scss'), data);
        }

        // Documenting the creation of the directive
        if(!isDuplicate){
          try{
            const descriptionForDocs = (this.props.description && this.props.description.length>0)?this.props.description:directiveName + " directive";
            const directiveDocJSONString = '{"name": "' + data.directiveNameCamel + '", "path": "' + this.props.directiveName + '", "description": "' + descriptionForDocs + '"},';
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
        }
    };
};
