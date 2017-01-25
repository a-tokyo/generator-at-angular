'use strict';
const yeoman = require('yeoman-generator').Base;
const yosay = require('yosay');
const chalk = require('chalk');
const pkg = require('../../package.json');

const AngularATGenerator = yeoman.extend({
    //loging the AT greeting message
    greeting: function () {
        this.log(yosay(
            'Welcome to the awesome ' + chalk.red('AT Angular') + ' generator!'
        ));
    },

    //exteding yoemen generator with custom code
    constructor: function () {
        yeoman.apply(this, arguments);

        // Define arguments
        this.argument('appName', {
            type: String,
            required: false
        });

        this.version = pkg.version;

        this.props = {};

        this.composeWith('git-init', {}, {
          local: require.resolve('generator-git-init')
        });
    }

  });


require('./src/prompts')(AngularATGenerator);
require('./src/modules')(AngularATGenerator);
require('./src/files')(AngularATGenerator);
require('./src/install')(AngularATGenerator);


module.exports = AngularATGenerator;
