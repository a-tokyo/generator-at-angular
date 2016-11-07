'use strict';

var yeoman = require('yeoman-generator').Base;
var yosay = require('yosay');
var pkg = require('../../package.json');
var chalk = require('chalk');

// Calling the super constructor to extend yoemen generator
var AngularATGenerator = yeoman.extend({
    //loging the AT greeting message
    greeting: function () {
        this.log(yosay(
            'Welcome to the awesome ' + chalk.red('AT Angular') + ' generator!'
        ));
    },

    //exteding yoemen generator
    constructor: function () {
        yeoman.apply(this, arguments);

        // Define arguments
        this.argument('appName', {
            type: String,
            required: false
        });
        // console custom properties
        this.props = {};
        // app version
        this.version = pkg.version;
    }

  });


require('./src/prompts')(AngularATGenerator);
require('./src/modules')(AngularATGenerator);
require('./src/files')(AngularATGenerator);
require('./src/install')(AngularATGenerator);


module.exports = AngularATGenerator;
