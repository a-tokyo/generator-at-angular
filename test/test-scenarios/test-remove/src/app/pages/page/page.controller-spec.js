import angular from 'angular';
import 'angular-mocks';
import * as PageController from './Page.controller';

describe('Page controller', () => {

 beforeEach(() => {
    angular
      .module('dummyModule', [])
      .controller('Page', PageController);
    angular.mock.module('dummyModule');
  });

  it('Should say Hello', angular.mock.inject(($rootScope, $compile, $controller, $log) => {
    let scope = $rootScope.$new();
    const ctrl = $controller('Page', {$scope: scope});
    expect($log.debug.logs[0]).toEqual(['Hello from PageController!']);
  }));

});
