'use strict';
const yeoman = require('yeoman-generator').Base;
const chalk = require('chalk');
const _ = require('lodash');
const prompts = require('./prompts.json');

let AngularATGenerator = yeoman.extend({

    //exteding yoemen generator with custom code
    constructor: function () {
        yeoman.apply(this, arguments);

        // Define arguments
        this.argument('pageName', {
            type: String,
            required: false
        });

        this.props = {};
    },
    prompting: function () {
        // if (this.skipConfig || this.options.default) {
        //     return;
        // }
        if (this.arguments[0]) {
            // if page name was provided in arguments, set it and skip
            this.props.pageName = this.arguments[0];
            this.props.pageState = 'default: pageName';
            this.props.pageRoute = 'default: /pageName';
            return;
        }

        let done = this.async();
        // calling prompts async
        this.prompt(prompts, function (props) {
            this.props = _.merge(this.props, props);
            // calling done to continue run loop
            done();
        }.bind(this));
    }

  });


// require('./src/prompts')(AngularATGenerator);
require('./src/files')(AngularATGenerator);


module.exports = AngularATGenerator;
