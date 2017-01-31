'use strict';
const path = require('path');
const fs = require('fs-extra');
const helpers = require('yeoman-test');
const assert = require('assert');
const should = require('should');
const _ = require('lodash');
const genUtils = require('../generators/utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');
const testUtils = require('./test-utils');
let testDir = null;

describe('at-angular:remove', function() {

  describe('at-angular:remove component', function() {
    beforeEach(function() {
      return helpers.run(path.join(__dirname, '../generators/remove')).inTmpDir(function(dir) {
        testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
        testDir = dir;
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/docs'), dir + '/docs');
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/src'), dir + '/src');
      }).withPrompts({type: 'component', itemName: 'comp', confirmRemove: true});
    });

    afterEach(function() {
      if (testDir != null && !testUtils.debugMode) {
        testUtils.deleteDirRecursive(testDir);
      }
    });

    it('should remove component files along with nested components, directives and services', function(done) {
      const notExpected = ['src/app/components/comp', 'src/app/components/comp'];
      assert.noFile(notExpected);
      // calling done
      done();
    });

  });

  describe('at-angular:remove directive', function() {
    beforeEach(function() {
      return helpers.run(path.join(__dirname, '../generators/remove')).inTmpDir(function(dir) {
        testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
        testDir = dir;
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/docs'), dir + '/docs');
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/src'), dir + '/src');
      }).withPrompts({type: 'directive', itemName: 'directive', confirmRemove: true});
    });

    afterEach(function() {
      if (testDir != null && !testUtils.debugMode) {
        testUtils.deleteDirRecursive(testDir);
      }
    });

    it('should remove directive files', function(done) {
      const notExpected = ['src/app/directives/directive'];
      assert.noFile(notExpected);
      // calling done
      done();
    });

  });

  describe('at-angular:remove service', function() {
    beforeEach(function() {
      return helpers.run(path.join(__dirname, '../generators/remove')).inTmpDir(function(dir) {
        testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
        testDir = dir;
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/docs'), dir + '/docs');
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/src'), dir + '/src');
      }).withPrompts({type: 'service', itemName: 'service', confirmRemove: true});
    });

    afterEach(function() {
      if (testDir != null && !testUtils.debugMode) {
        testUtils.deleteDirRecursive(testDir);
      }
    });

    it('should remove service files', function(done) {
      const notExpected = ['src/app/services/service'];
      assert.noFile(notExpected);
      // calling done
      done();
    });

  });

  describe('at-angular:remove page', function() {
    beforeEach(function() {
      return helpers.run(path.join(__dirname, '../generators/remove')).inTmpDir(function(dir) {
        testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
        testDir = dir;
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/docs'), dir + '/docs');
        fs.copySync(path.join(__dirname, './test-scenarios/test-remove/src'), dir + '/src');
      }).withPrompts({type: 'page', itemName: 'page', confirmRemove: true});
    });

    afterEach(function() {
      if (testDir != null && !testUtils.debugMode) {
        testUtils.deleteDirRecursive(testDir);
      }
    });

    it('should remove page files', function(done) {
      const notExpected = ['src/app/pages/page'];
      assert.noFile(notExpected);
      // calling done
      done();
    });

  });

});
