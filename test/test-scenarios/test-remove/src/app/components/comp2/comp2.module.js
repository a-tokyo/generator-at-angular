import * as componentComponent from './comp2.component';

import * as nestedComp2 from './components/nested-comp2/nested-comp2.module';
// Add module imports above

// Add directive imports above

// Add service imports above

import './comp2.component.scss';

// Add style imports above

const componentModule = angular.module('comp2', [
'nestedComp2',
// Add module dependencies above
]);

componentModule.component('comp2', componentComponent);

// Add directive to module above

// Add service to module above

export default componentModule;
