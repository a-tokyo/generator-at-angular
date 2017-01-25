'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
// const fs = require('fs');
// TODO
describe('at-angular:component', function() {
  beforeEach(function() {
    // The object returned act like a promise, so return it to wait until the process is done
    return helpers.run(path.join(__dirname, '../generators/component'))
  });

  // it('should create the expected component files', function(done) {
  //   const expected = [
  //     // add files you expect to exist here.
  //   ];
  //   assert.file(expected);
  //   // calling done
  //   done();
  // });

});
