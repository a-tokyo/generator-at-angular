const shared = angular.module('core.shared', []);

// Add new directives above

require('./services/store/store.factory')(shared);
// Add new services above

export default shared;
