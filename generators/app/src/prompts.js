'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const prompts = require('../prompts.json');

// function logChoice(prompt, prop) {
//   let choice = _.find(prompt.choices, {value: prop});
//   this.log('\t*', choice.name);
// }

function getDefaultProps() {
  let defaults = {};
  // get defaults from prompts.json
  _.forIn(prompts, function(message) {
    defaults[message.name] = message.name;
    defaults[message.name] = message.default;
  });
  return defaults;
}

function getDreidevProps() {
  let dreidevProps = getDefaultProps();
  dreidevProps.bootstrapSass = false;
  dreidevProps.appName = 'dreidevATApp';
  return dreidevProps;
}

module.exports = function(AngularATGenerator) {

  /*
   * Ask all questions from prompts.json
   * Add conditional tests on those depending on first responses
   * Complete responses with null answers for questions not asked
   */
  AngularATGenerator.prototype.askQuestions = function askQuestions() {
    // if (this.skipConfig) {
    //   return;
    // } else
    if (this.options.d || this.options.default) {
      // calling default options
      this.props = _.merge(this.props, getDefaultProps());
      return;
    } else if (this.options.dreidev) {
      this.props = _.merge(this.props, getDreidevProps());
      this.props.extraDeps = [{dependency: "at-flex-grid", package: "at-flex-grid"}];
      return;
    } else {
      let done = this.async();
      // calling prompts async
      this.prompt(prompts, function(props) {
        this.props = _.merge(this.props, props);
        // calling done to continue run loop
        done();
      }.bind(this));
    }
  };
};
