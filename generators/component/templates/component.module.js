'use strict';

import * as componentComponent from './<%= componentName %>.component';
import './<%= componentName %>.scss';

const componentModule = angular.module('<%= componentNameCamel %>', []);

componentModule.component('<%= componentName %>', componentComponent);

export default componentModule;
