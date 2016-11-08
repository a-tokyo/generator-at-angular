'use strict';

var yeoman = require('yeoman-generator').Base;
var chalk = require('chalk');

var AngularATGenerator = yeoman.extend({

    //exteding yoemen generator with custom code
    constructor: function () {
        yeoman.apply(this, arguments);

        // Define arguments
        this.argument('componentName', {
            type: String,
            required: false
        });

        this.props = {};
    }

  });


require('./src/prompts')(AngularATGenerator);
require('./src/files')(AngularATGenerator);


module.exports = AngularATGenerator;
