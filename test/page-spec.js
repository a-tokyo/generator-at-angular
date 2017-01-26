'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');
const testUtils = require('./test-utils');
let testDir = null;

describe('at-angular:page', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/page')).inTmpDir(function(dir) {
      testUtils.logIf('running in tmp dir:\n' + dir + '\n', testUtils.debugMode)
      testDir = dir;
      fs.mkdirp('src/app/pages');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.module.js'), dir + '/src/app/index.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
  });

  afterEach(function(){
    if(testDir != null){
      testUtils.deleteDirRecursive(testDir);
    }
  });

  it('should create the expected page files', function(done) {
    const expected = [
      'src/app/pages/page/page.controller-spec.js',
      'src/app/pages/page/page.controller.js',
      'src/app/pages/page/page.html',
      'src/app/pages/page/page.module.js',
      'src/app/pages/page/page.route.js',
      'src/app/pages/page/page.scss'
    ];
    assert.file(expected);
    // calling done
    done();
  });
});
