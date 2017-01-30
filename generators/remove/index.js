'use strict';
const yeoman = require('yeoman-generator').Base;
const chalk = require('chalk');
const _ = require('lodash');
const prompts = require('./prompts.json');

let AngularATGenerator = yeoman.extend({

    //exteding yoemen generator with custom code
    constructor: function () {
        yeoman.apply(this, arguments);

        this.props = {};
    },
    prompting: function () {
        let done = this.async();
        // calling prompts async
        this.prompt(prompts, function (props) {
            this.props = _.merge(this.props, props);
            // calling done to continue run loop
            done();
        }.bind(this));
    }
  });


require('./src/files')(AngularATGenerator);


module.exports = AngularATGenerator;
