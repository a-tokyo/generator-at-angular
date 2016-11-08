'use strict';

var yeoman = require('yeoman-generator').Base;
var yosay = require('yosay');
var chalk = require('chalk');
var pkg = require('../../package.json');

var AngularATGenerator = yeoman.extend({
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
    }

  });


require('./src/prompts')(AngularATGenerator);
require('./src/modules')(AngularATGenerator);
require('./src/files')(AngularATGenerator);
require('./src/install')(AngularATGenerator);


module.exports = AngularATGenerator;
