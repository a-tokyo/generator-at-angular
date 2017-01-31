import * as componentComponent from './comp.component';

import * as nestedComp from './components/nested-comp/nested-comp.module';
// Add module imports above

import * as nestedDirectiveDirective from './directives/nested-directive/nested-directive.directive';
// Add directive imports above

import * as nestedServiceFactory from './services/nested-service/nested-service.factory';
// Add service imports above

import './comp.component.scss';

// Add style imports above

const componentModule = angular.module('comp', [
'nestedComp',
// Add module dependencies above
]);

componentModule.component('comp', componentComponent);

componentModule.directive('nestedDirective', nestedDirectiveDirective);
// Add directive to module above

componentModule.factory('nestedServiceFactory', nestedServiceFactory);
// Add service to module above

export default componentModule;
