'use strict';

import * as route from './<%= pageName %>.route';
import './<%= pageName %>.scss';

const <%= pageName %>Module = angular.module('<%= pageModule %>Page', [
  'ui.router'
]);

<%= pageName %>Module.config(route);

export default <%= pageName %>Module;
