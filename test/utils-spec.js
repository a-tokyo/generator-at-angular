const genUtils = require('../generators/utils');
const fs = require('fs-extra');
const path = require('path');
const should = require('should');


describe('Utils', function() {
  describe('stripPackageName()', function() {
    it('should return the appropriate package name to import', function() {
      genUtils.stripPackageName('at-flex-grid@0.1.0').should.equal('at-flex-grid');
    });
  });

  describe('deleteDirRecursive()', function() {
    it('should delete the appropriate directory', function() {
      var dirPath = path.join(__dirname, 'testDir');
      fs.mkdirp(dirPath);
      genUtils.deleteDirRecursive(dirPath);
      fs.existsSync(dirPath).should.equal(false);
    });

    it('should not throw when the dir is not found', function() {
      var dirPath = path.join(__dirname, 'testDir');
      genUtils.deleteDirRecursive(dirPath);
      fs.existsSync(dirPath).should.not.throw();
    });
  });
});
