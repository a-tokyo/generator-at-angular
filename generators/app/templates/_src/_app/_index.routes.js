'use strict';

function routeConfig($urlRouterProvider, $stateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

}

export default angular
  .module('index.routes', [])
    .config(routeConfig);
