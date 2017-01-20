'use strict';

import pageTpl from './<%= pageName %>.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('<%= pageState %>', {
      url: '<%= pageRoute %>',
      templateUrl: pageTpl,
      controller: require('./<%= pageName %>.controller')
    });

}

export default routeConfig;
