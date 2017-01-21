import * as route from './<%= pageName %>.route';
import './<%= pageName %>.scss';

const pageModule = angular.module('<%= pageModule %>', [
  'ui.router'
]);

pageModule.config(route);

export default pageModule;
