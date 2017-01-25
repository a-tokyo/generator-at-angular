'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');

describe('at-angular:directive', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      console.log('running in tmp dir:\n' + dir + '\n')
      mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
  });

  it('should create the expected directive files', function(done) {
    const expected = [
      'src/app/core/directives/directive/directive.directive-spec.js',
      'src/app/core/directives/directive/directive.directive.js',
      'src/app/core/directives/directive/directive.directive.html',
      'src/app/core/directives/directive/directive.directive.scss'
    ];
    assert.file(expected);
    // calling done
    done();
  });

});


describe('at-angular:directive no partial', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      console.log('running in tmp dir:\n' + dir + '\n')
      mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withPrompts({needsPartial: false});
  });

  it('should create the expected directive files', function(done) {
    const expected = [
      'src/app/core/directives/directive/directive.directive-spec.js',
      'src/app/core/directives/directive/directive.directive.js'
    ];
    assert.file(expected);
    const notExpected = [
      'src/app/core/directives/directive/directive.directive.html',
      'src/app/core/directives/directive/directive.directive.scss'
    ];
    fs.stat('src/app/core/directives/directive/directive.directive.html', function(err, stat){
      assert(err!=null);
      // calling done
      done();
    });
  });
});

describe('at-angular:directive named-directive', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      console.log('running in tmp dir:\n' + dir + '\n')
      mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withArguments(['named-directive']);
  });

  it('should create the expected directive files', function(done) {
    const expected = [
      'src/app/core/directives/named-directive/named-directive.directive-spec.js',
      'src/app/core/directives/named-directive/named-directive.directive.js'
    ];
    assert.file(expected);
    done();
  });
});
