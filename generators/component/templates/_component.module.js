import * as componentComponent from './<%= componentName %>.component';

// Add module imports above

// Add directive imports above

// Add service imports above

import './<%= componentName %>.component.scss';

// Add style imports above

const componentModule = angular.module('<%= componentModule %>', [
// Add module dependencies above
]);

componentModule.component('<%= componentNameCamel %>', componentComponent);

// Add directive to module above

// Add service to module above

export default componentModule;
