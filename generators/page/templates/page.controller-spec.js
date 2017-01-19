import angular from 'angular';
import 'angular-mocks';
import * as <%= controllerName %>Controller from './<%= controllerName %>.controller';

describe('<%= controllerName %> controller', () => {

 beforeEach(() => {
    angular
      .module('dummyModule', [])
      .controller('<%= controllerName %>', <%= controllerName %>Controller);
    angular.mock.module('dummyModule');
  });

   it('Should say Hello', angular.mock.inject(($rootScope, $compile, $controller, $log) => {
    var scope = $rootScope.$new();
    const ctrl = $controller('<%= controllerName %>', {$scope: scope});

    expect($log.debug.logs[0]).toEqual(['Hello from <%= controllerName %>Controller!']);

  }));

});
