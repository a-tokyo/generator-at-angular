'use strict';

import * as route from './<%= pageName %>.route';
import './<%= pageName %>.scss';

const <%= pageModule %>Module = angular.module('<%= pageModule %>', [
  'ui.router'
]);

<%= pageModule %>Module.config(route);

export default <%= pageModule %>Module;
