'use strict';

var mkdirp = require('mkdirp');
var _ = require("lodash");

module.exports = function (AngularATGenerator) {

    AngularATGenerator.prototype.testFileWr = function testFileWr() {
      this.props.styles = {};
      var that = this;
      this.props.angularModules.forEach(function(elm){
        if(elm.key === "material"){
          that.props.styles.material = true;
        }
      });
    };

    AngularATGenerator.prototype.copyFiles = function copyFiles() {
        mkdirp("src");
        mkdirp("src/assets");
        mkdirp("src/assets/fonts");
        mkdirp("src/assets/images");
        mkdirp("src/assets/js");
        mkdirp("src/app/pages");
        mkdirp("src/app/components");
        mkdirp("src/app/core/directives");

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('_webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            this
        );
        this.fs.copy(
            this.templatePath('_.gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('_.yo-rc.json'),
            this.destinationPath('.yo-rc.json')
        );
        this.fs.copy(
            this.templatePath('_.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('_config/**/*'),
            this.destinationPath('config/'),
            this
        );

        this.fs.copy(
            this.templatePath('_src/_favicon.ico'),
            this.destinationPath(this.destinationRoot()+'/src/favicon.ico')
        );
        this.fs.copy(
            this.templatePath('_src/_tpl-index.ejs'),
            this.destinationPath(this.destinationRoot()+'/src/tpl-index.ejs')
        );
        this.fs.copyTpl(
            this.templatePath('_src/_assets/_styles/_sass/_index.scss'),
            this.destinationPath(this.destinationRoot()+'/src/assets/styles/sass/index.scss'),
            this
        );

        this.fs.copyTpl(
            this.templatePath('_src/_app/_index.bootstrap.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.bootstrap.js'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('_src/_app/_index.module.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.module.js'),
            this
        );
        this.fs.copy(
            this.templatePath('_src/_app/_index.components.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.components.js')
        );
        this.fs.copy(
            this.templatePath('_src/_app/_index.config.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.config.js')
        );
        this.fs.copyTpl(
            this.templatePath('_src/_app/_index.routes.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.routes.js'),
            this
        );
        this.fs.copy(
            this.templatePath('_src/_app/_index.run.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.run.js')
        );
        this.fs.copyTpl(
            this.templatePath('_src/_app/_index.vendor.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/index.vendor.js'),
            this
        );

        this.fs.copy(
            this.templatePath('_src/_app/_core/core.module.js'),
            this.destinationPath(this.destinationRoot()+'/src/app/core/core.module.js')
        );

        this.fs.copy(
            this.templatePath('_src/_app/_core/_directives/**/*'),
            this.destinationPath(this.destinationRoot()+'/src/app/core/directives')
        );

        this.fs.copyTpl(
            this.templatePath('_src/_app/_core/_services/**/*'),
            this.destinationPath(this.destinationRoot()+'/src/app/core/services'),
            this
        );
    };

};
