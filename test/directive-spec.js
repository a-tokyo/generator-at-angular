'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');
const testUtils = require('./test-utils');
let testDir = null;

describe('at-angular:directive', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
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
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withPrompts({needsPartial: false});
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
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
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/core/directives');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withArguments(['named-directive']);
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
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

describe('at-angular:directive component/directive', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/components/component');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.components.js'), dir + '/src/app/index.components.js');
      fs.copySync(path.join(__dirname, '../generators/component/templates/_component.module.js'), dir + '/src/app/components/component/component.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withArguments(['component/named-directive']);
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should create the expected directive files', function(done) {
    const expected = [
      'src/app/components/component/directives/named-directive/named-directive.directive-spec.js',
      'src/app/components/component/directives/named-directive/named-directive.directive.js'
    ];
    assert.file(expected);
    done();
  });
});

describe('at-angular:directive not-existing/directive', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/directive')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/components');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    }).withArguments(['not-existing/directive']);
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should not create directive files for a nested directive when parent not found', function(done) {
    const notExpected = [
      'src/app/components/not-existing/directives/directive/directive.directive.js',
      'src/app/components/not-existing/directives/directive/directive.directive-spec.js'
    ];
    assert.noFile(notExpected);
    done();
  });
});
