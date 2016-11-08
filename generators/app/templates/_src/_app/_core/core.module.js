'use strict';

const shared = angular.module('core.shared', []);

// require('./directives/validation-test/validation-test.directive')(shared);

require('./services/store.factory')(shared);

// Add new services above

export default shared;
