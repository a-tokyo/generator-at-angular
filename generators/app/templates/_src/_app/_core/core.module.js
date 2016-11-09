'use strict';

const shared = angular.module('core.shared', []);


// Add new directives above

require('./services/store.factory')(shared);
// Add new services above

export default shared;
