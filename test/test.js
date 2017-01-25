'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs');

describe('at-angular generator', function () {
  beforeEach(function () {
  // The object returned act like a promise, so return it to wait until the process is done
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({ appName: "testApp",bootstrapSass: false }); // Mock the prompt answers
  });

  it('creates expected files', function (done) {
    const expected = [
      // add files you expect to exist here.
      'config/webpack/global.js',
      'config/webpack/environments/development.js',
      'config/webpack/environments/production.js',
      'docs/docs.html',
      'docs/docs-assets/docs-app.js',
      'docs/docs-assets/docs.css',
      'docs/docs-assets/docs.js',
      '.babelrc',
      '.editorconfig',
      '.eslintrc.json',
      '.yo-rc.json',
      'karma.conf.js',
      'package.json',
      'README.md',
      'test-context.js',
      'webpack.config.js'
    ];
    assert.file(expected);
    // calling done
    done();
  });
});
