'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');

describe('at-angular:page', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/page')).inTmpDir(function(dir) {
      console.log('running in tmp dir:\n' + dir + '\n')
      fs.mkdirp('src/app/pages');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.module.js'), dir + '/src/app/index.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
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
