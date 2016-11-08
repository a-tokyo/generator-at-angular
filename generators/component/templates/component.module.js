'use strict';

import * as componentDirective from './<%= componentName %>.component';
import './<%= componentName %>.scss';

const componentModule = angular.module(<%= componentNameCamel %>, []);

componentModule
  .directive('componentTest', componentDirective);

export default componentModule;
