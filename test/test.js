'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
// const fs = require('fs');

describe('at-angular generator', function() {
  beforeEach(function() {
    // The object returned act like a promise, so return it to wait until the process is done
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: "testApp", bootstrapSass: false}); // Mock some prompt answers, and depend on defaults for others
  });

  it('should create the expected webpack config files', function(done) {
    const expected = [
      // add files you expect to exist here.
      'config/webpack/global.js',
      'config/webpack/environments/development.js',
      'config/webpack/environments/production.js',
      'webpack.config.js'
    ];
    assert.file(expected);
    // calling done
    done();
  });

  it('should create the expected documentation files', function(done) {
    const expected = [
      // add files you expect to exist here.
      'docs/docs.html',
      'docs/docs-assets/docs-app.js',
      'docs/docs-assets/docs.css',
      'docs/docs-assets/docs.js'
    ];
    assert.file(expected);
    // calling done
    done();
  });

  it('should create the general expected files', function(done) {
    const expected = [
      // add files you expect to exist here.
      '.babelrc',
      '.editorconfig',
      '.eslintrc.json',
      '.yo-rc.json',
      'karma.conf.js',
      'package.json',
      'README.md',
      'test-context.js'
    ];
    assert.file(expected);
    // calling done
    done();
  });

});
