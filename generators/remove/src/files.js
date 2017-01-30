'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      switch (this.props.type) {
        case 'component':

          break;
        case 'directive':

          break;
        case 'page':

          break;
        case 'service':

          break;
      }
    };
};
