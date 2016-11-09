'use strict';

import * as componentComponent from './<%= componentName %>.component';

// Add module imports above

import './<%= componentName %>.component.scss';

// Add style imports above

const componentModule = angular.module('<%= componentModule %>', [
// Add module dependencies above
]);

componentModule.component('<%= componentName %>', componentComponent);

export default componentModule;
