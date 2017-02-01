'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');

// const expected files
const expectedConfigFiles = ['config/webpack/global.js', 'config/webpack/environments/development.js', 'config/webpack/environments/production.js', 'webpack.config.js'];
const expectedDocsFiles = ['docs/docs.html', 'docs/docs-assets/docs.css', 'docs/docs-assets/docs.js', 'docs/docs-assets/docs.json'];
const expectedGeneralFiles = [
  '.babelrc',
  '.editorconfig',
  '.eslintrc.json',
  '.yo-rc.json',
  'karma.conf.js',
  'package.json',
  'README.md',
  'test-context.js'
];
const expectedAngularAppFiles = [
  'src/assets/styles/sass/fonts.scss',
  'src/assets/styles/sass/index.scss',
  'src/assets/styles/sass/main.scss',
  'src/favicon.ico',
  'src/tpl-index.ejs',
  'src/app/components',
  'src/app/core/core.module.js',
  'src/app/index.bootstrap.js',
  'src/app/index.components.js',
  'src/app/index.config.js',
  'src/app/index.module.js',
  'src/app/index.routes.js',
  'src/app/index.run.js',
  'src/app/index.vendor.js',
  'src/app/pages'
];

const expectedFiles = expectedConfigFiles.concat(expectedConfigFiles).concat(expectedDocsFiles).concat(expectedGeneralFiles).concat(expectedAngularAppFiles);

describe('at-angular', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({appName: "testApp"}); // Mock some prompt answers, and depend on defaults for others
  });
  it('should create the expected angular application files', function(done) {
    assert.file(expectedAngularAppFiles);
    done();
  });
});

describe('at-angular --dreidev', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/app')).withOptions({dreidev: true}); // Mock some prompt answers, and depend on defaults for others
  });

  it('should create the expected dreidev angular application files', function(done) {
    const dreidevExpectedAngularAppFiles = expectedAngularAppFiles.concat(
      ['src/assets/js/translate.js', 'src/assets/styles/sass/dreidev-reset.scss', 'src/assets/styles/sass/variables.scss', 'src/assets/styles/sass/mixins.scss']
    );
    assert.file(dreidevExpectedAngularAppFiles);
    done();
  });
});

describe('at-angular --default', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/app')).withOptions({default: true}); // Mock some prompt answers, and depend on defaults for others
  });

  it('should create the expected angular application files', function(done) {
    assert.file(expectedAngularAppFiles);
    done();
  });
});
