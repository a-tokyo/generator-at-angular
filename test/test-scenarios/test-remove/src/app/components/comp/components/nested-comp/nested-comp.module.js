import * as componentComponent from './nested-comp.component';

// Add module imports above

// Add directive imports above

// Add service imports above

import './nested-comp.component.scss';

// Add style imports above

const componentModule = angular.module('nestedComp', [
// Add module dependencies above
]);

componentModule.component('nestedComp', componentComponent);

// Add directive to module above

// Add service to module above

export default componentModule;
