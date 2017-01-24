function routeConfig($urlRouterProvider, $stateProvider) {
  'ngInject';
  // Add new states above
  // Add new routes above
  $urlRouterProvider.otherwise('/');
}

export default angular
  .module('index.routes', [])
    .config(routeConfig);
