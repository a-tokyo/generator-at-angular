const shared = angular.module('core.shared', []);


import * as directiveDirective from './directives/directive/directive.directive';
// Add directive imports above

import * as storeFactory from './services/store/store.factory';
import * as serviceFactory from './services/service/service.factory';
// Add service imports above

shared.directive('directive', directiveDirective);
// Add directive to module above

shared.factory('store', storeFactory);
shared.factory('serviceFactory', serviceFactory);
// Add service to module above

export default shared;
