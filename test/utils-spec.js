const testUtils = require('../generators/utils');


describe('Utils', function() {
  describe('stripPackageName()', function() {
    it('should return the appropriate package name to import', function() {
      testUtils.stripPackageName('at-flex-grid@0.1.0').should.equal('at-flex-grid');
    });
  });
});
