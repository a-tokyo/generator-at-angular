'use strict';

import * as componentComponent from './<%= componentName %>.component';

// Add module imports above

// Add directive imports above

import './<%= componentName %>.component.scss';

// Add style imports above

const componentModule = angular.module('<%= componentModule %>', [
// Add module dependencies above
]);

componentModule.component('<%= componentName %>', componentComponent);

// Add directive to module above

export default componentModule;
