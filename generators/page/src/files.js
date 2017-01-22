var _ = require("lodash");
var utils = require("../../utils.js");

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
        // data to be passed to templates and used to get info
        var data = {
            'pageName': this.props.pageName,
            'pageNameCamel': _.camelCase(this.props.pageName),
            'controllerName': _.upperFirst(_.camelCase(this.props.pageName)),
            'pageModule': _.camelCase(this.props.pageName)+'Page',
            'pageState': this.props.pageState === 'default: pageName' ? this.props.pageName:this.props.pageState,
            'pageRoute': this.props.pageRoute === 'default: /pageName' ? '/'+this.props.pageName : this.props.pageRoute
        };

        try{
          // import the page to the pages module
          var indexModulesWriteLine = "require('./pages/" + data.pageName + "/" + data.pageName + ".module').name,";
          utils.addToFile('index.module.js', indexModulesWriteLine, utils.PAGE_MARKER, this.destinationRoot() + '/src/app');
          // copy template files
          this.fs.copyTpl(this.templatePath('_page.html'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.html'), data);
          this.fs.copyTpl(this.templatePath('_page.scss'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.scss'), data);
          this.fs.copyTpl(this.templatePath('_page.module.js'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.module' + '.js'), data);
          this.fs.copyTpl(this.templatePath('_page.route.js'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.route' + '.js'), data);
          this.fs.copyTpl(this.templatePath('_page.controller.js'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.controller' + '.js'), data);
          this.fs.copyTpl(this.templatePath('_page.controller-spec.js'), this.destinationPath(this.destinationRoot() + '/src/app/pages/' + data.pageName + '/' + data.pageName + '.controller-spec' + '.js'), data);
        } catch (err) {
            this.log('Could not generate this item due to missing file structure.');
            return;
        }

        // Documenting the creation of the page
        try{
          var descriptionForDocs = (this.props.description && this.props.description.length>0)?this.props.description:data.pageName + " page";
          var pageDocJSONString = '{"name": "' + data.pageName + '", "route": "' + data.pageRoute + '", "state": "' + data.pageState + '", "description": "' + descriptionForDocs + '"},';
          utils.addToFile(utils.DOCS_STORAGE_FILENAME, pageDocJSONString, utils.PAGE_MARKER, this.destinationRoot() + utils.DOCS_ASSETS_PATH);
        } catch (err) {
          this.log('Could not document this item due to missing documentation file.');
        }
    };
};
