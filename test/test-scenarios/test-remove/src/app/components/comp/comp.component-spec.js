import angular from 'angular';
import 'angular-mocks';
import * as comp from './comp.component';

describe('comp component', () => {

  beforeEach(() => {
    angular
      .module('comp',[])
      .component('comp', comp);
    angular.mock.module('comp');
  });

  it('should render comp component', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<comp></comp>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

});
