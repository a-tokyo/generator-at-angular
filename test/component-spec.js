'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');
const testUtils = require('./test-utils');

describe('at-angular:component', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/component')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      fs.mkdirp('src/app/components');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.components.js'), dir + '/src/app/index.components.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
  });

  it('should create the expected component files', function(done) {
    const expected = [
      'src/app/components/component/component.component-spec.js',
      'src/app/components/component/component.component.js',
      'src/app/components/component/component.component.html',
      'src/app/components/component/component.module.js',
      'src/app/components/component/component.component.scss',
    ];
    assert.file(expected);
    // calling done
    done();
  });
});

describe('at-angular:component component/component', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/component')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      fs.mkdirp('src/app/components/component');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.components.js'), dir + '/src/app/index.components.js');
      fs.copySync(path.join(__dirname, '../generators/component/templates/_component.module.js'), dir + '/src/app/components/component/component.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withArguments(['component/named-component']);
  });

  it('should create the expected component files', function(done) {
    const expected = [
      'src/app/components/component/components/named-component/named-component.component-spec.js',
      'src/app/components/component/components/named-component/named-component.component.js',
      'src/app/components/component/components/named-component/named-component.module.js',
      'src/app/components/component/components/named-component/named-component.component.html',
      'src/app/components/component/components/named-component/named-component.component.scss'
    ];
    assert.file(expected);
    done();
  });
});
