'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const _ = require('lodash');
const genUtils = require('../generators/utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

// describe('at-angular:remove', function() {
//   beforeEach(function() {
//     return helpers.run(path.join(__dirname, '../generators/remove')).withProps({}); // Mock some prompt answers, and depend on defaults for others
//   });
//
//   it('should remove', function(done) {
//     done();
//   });
// });
