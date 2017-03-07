'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');
const testUtils = require('./test-utils');
let testDir = null;

describe('at-angular:service', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      testUtils.logIf(`running in tmp dir:\n${dir}\n`, testUtils.debugMode);
      testDir = dir;
      fs.mkdirp('src/app/core/services');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withPrompts({description: 'a service'});
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should create the expected service files', function(done) {
    const expected = [
      'src/app/core/services/service/service.factory-spec.js',
      'src/app/core/services/service/service.factory.js'
    ];
    assert.file(expected);
    // calling done
    done();
  });
});

describe('at-angular:service component/service', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      testUtils.logIf(`running in tmp dir:\n${dir}\n`, testUtils.debugMode);
      testDir = dir;
      fs.mkdirp('src/app/components/component');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.components.js'), dir + '/src/app/index.components.js');
      fs.copySync(path.join(__dirname, '../generators/component/templates/_component.module.js'), dir + '/src/app/components/component/component.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
      testUtils.dummyComponentInDocs(dir + '/docs/docs-assets/docs.json');
    })
    .withArguments(['component/named-service']);
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should create the expected service files', function(done) {
    const expected = [
      'src/app/components/component/services/named-service/named-service.factory-spec.js',
      'src/app/components/component/services/named-service/named-service.factory.js'
    ];
    assert.file(expected);
    done();
  });
});

describe('at-angular:service not-existing/service', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      testUtils.logIf(`running in tmp dir:\n${dir}\n`, testUtils.debugMode);
      testDir = dir;
      fs.mkdirp('src/app/components');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    }).withArguments(['not-existing/service']);
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should not create service files for a nested service when parent not found', function(done) {
    const notExpected = [
      'src/app/components/not-existing/services/service/service.factory.js',
      'src/app/components/not-existing/services/service/service.factory-spec.js'
    ];
    assert.noFile(notExpected);
    done();
  });
});

describe('at-angular:service (with no parent module)', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      testUtils.logIf(`running in tmp dir:\n${dir}\n`, testUtils.debugMode);
      testDir = dir;
      fs.mkdirp('src/app/core/services');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    });
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should not create service files when parent module not found', function(done) {
    const notExpected = [
      'src/app/core/services/service/service.service-spec.js',
      'src/app/core/services/service/service.service.js',
    ];
    assert.noFile(notExpected);
    done();
  });
});

describe('at-angular:service documentation', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      testUtils.logIf(`running in tmp dir:\n${dir}\n`, testUtils.debugMode);
      testDir = dir;
      fs.mkdirp('src/app/core/services');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
    });
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should not throw error if docs not found but exit gracefuly', function() {
  }).should.not.throw();
});
