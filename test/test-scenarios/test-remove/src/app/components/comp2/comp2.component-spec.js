import angular from 'angular';
import 'angular-mocks';
import * as comp2 from './comp2.component';

describe('comp2 component', () => {

  beforeEach(() => {
    angular
      .module('comp2',[])
      .component('comp2', comp2);
    angular.mock.module('comp2');
  });

  it('should render comp2 component', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<comp2></comp2>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

});
