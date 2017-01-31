import * as route from './page.route';
import './page.scss';

const pageModule = angular.module('pagePage', [
  'ui.router'
]);

pageModule.config(route);

export default pageModule;
