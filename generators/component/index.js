'use strict';
const yeoman = require('yeoman-generator').Base;
const chalk = require('chalk');
const _ = require('lodash');
const prompts = require('./prompts.json');

let AngularATGenerator = yeoman.extend({

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

      if(this.options.remove){
        // calling prompts async
        console.log('sadsd');
        let confirmRemovePrompts = [{
            "type": "confirm",
            "name": "remove",
            "message": "Would you like to remove this component?",
            "default": true
          }];
          return;

                  let done = this.async();
                  // calling prompts async
                  this.prompt(prompts, function(props) {
                      this.props = _.merge(this.props, props);
                      // calling done to continue run loop
                      console.log('sadsd2');
                      done();
                  }.bind(this));
      }

        if (this.arguments[0]) {
            // if component name was provided in arguments, set it and skip
            this.props.componentName = this.arguments[0];
            return;
        }

        let done = this.async();
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
