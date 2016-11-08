'use strict';

function routeConfig($urlRouterProvider, $stateProvider) {
  'ngInject';
  /* Add New States Above */
  /* Add New Routes Above */
  $urlRouterProvider.otherwise('/');

}

export default angular
  .module('index.routes', [])
    .config(routeConfig);
