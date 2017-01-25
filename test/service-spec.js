'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('assert');
const fs = require('fs-extra');

describe('at-angular:service', function() {
  beforeEach(function() {
    return helpers.run(path.join(__dirname, '../generators/service')).inTmpDir(function(dir) {
      console.log('running in tmp dir:\n' + dir + '\n')
      fs.mkdirp('src/app/core/services');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_core/_core.module.js'), dir + '/src/app/core/core.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
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
      console.log('running in tmp dir:\n' + dir + '\n')
      fs.mkdirp('src/app/components/component');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_src/_app/_index.components.js'), dir + '/src/app/index.components.js');
      fs.copySync(path.join(__dirname, '../generators/component/templates/_component.module.js'), dir + '/src/app/components/component/component.module.js');
      fs.copySync(path.join(__dirname, '../generators/app/templates/_docs/'), dir + '/docs/');
    })
    .withArguments(['component/named-service']);
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
