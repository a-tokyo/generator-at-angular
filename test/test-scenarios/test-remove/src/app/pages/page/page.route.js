import pageTpl from './page.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('page', {
      url: '/page',
      templateUrl: pageTpl,
      controller: require('./page.controller')
    });

}

export default routeConfig;
