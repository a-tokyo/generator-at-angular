'use strict';
const _ = require('lodash');
const chalk = require('chalk');

const prompts = require('../prompts.json');

function logChoice(prompt, prop) {
    let choice = _.find(prompt.choices, {value: prop});
    this.log('\t*', choice.name);
}

module.exports = function (AngularATGenerator) {

    /**
     * Check if the default option is set, if it is, use defaults props and log them
     */
    AngularATGenerator.prototype.defaultOption = function defaultOption() {
        if (this.options.default) {

            this.log('__________________________');
            this.log('You use ' + chalk.green('--default') + ' option:');

            _.forEach(this.props, function (propOrProps, key) {
                let prompt = _.find(prompts, {name: key});
                if (_.isArray(propOrProps)) {
                    propOrProps.forEach(function (prop) {
                        logChoice.call(this, prompt, prop);
                    }, this);
                } else {
                    logChoice.call(this, prompt, propOrProps);
                }
            }, this);

            this.log('__________________________\n');
        }
    };

    /**
     * Ask all questions from prompts.json
     * Add conditional tests on those depending on first responses
     * Complete responses with null answers for questions not asked
     */
    AngularATGenerator.prototype.askQuestions = function askQuestions() {
        if (this.skipConfig || this.options.default) {
            return;
        }

        let done = this.async();
        // calling prompts async
        this.prompt(prompts, function (props) {

            this.props = _.merge(this.props, props);
            // calling done to continue run loop
            done();
        }.bind(this));
    };

};
