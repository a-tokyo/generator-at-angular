'use strict';

import * as componentComponent from './<%= componentName %>.component';
import './<%= componentName %>.scss';

const componentModule = angular.module('<%= componentModule %>', []);

componentModule.component('<%= componentName %>', componentComponent);

export default componentModule;
