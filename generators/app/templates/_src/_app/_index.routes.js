'use strict';

function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
  'ngInject';
  /* Add New States Above */
  /* Add New Routes Above */
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

export default angular
  .module('index.routes', [])
    .config(routeConfig);
