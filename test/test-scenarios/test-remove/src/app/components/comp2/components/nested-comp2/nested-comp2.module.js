import * as componentComponent from './nested-comp2.component';

// Add module imports above

// Add directive imports above

// Add service imports above

import './nested-comp2.component.scss';

// Add style imports above

const componentModule = angular.module('nestedComp2', [
// Add module dependencies above
]);

componentModule.component('nestedComp2', componentComponent);

// Add directive to module above

// Add service to module above

export default componentModule;
