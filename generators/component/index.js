const yeoman = require('yeoman-generator').Base;
const chalk = require('chalk');
const _ = require('lodash');
const prompts = require('./prompts.json');

var AngularATGenerator = yeoman.extend({

    //exteding yoemen generator with custom code
    constructor: function() {
        yeoman.apply(this, arguments);

        // Define arguments
        this.argument('componentName', {
            type: String,
            required: false
        });

        this.props = {};
    },
    prompting: function() {
        if (this.skipConfig || this.options.default) {
            return;
        }
        if (this.arguments[0]) {
            // if component name was provided in arguments, set it and skip
            this.props.componentName = this.arguments[0];
            return;
        }

        var done = this.async();
        // calling prompts async
        this.prompt(prompts, function(props) {
            this.props = _.merge(this.props, props);
            // calling done to continue run loop
            done();
        }.bind(this));
    }

});

require('./src/files')(AngularATGenerator);

module.exports = AngularATGenerator;
