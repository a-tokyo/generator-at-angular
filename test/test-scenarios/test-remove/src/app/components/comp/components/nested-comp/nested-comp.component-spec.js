import angular from 'angular';
import 'angular-mocks';
import * as nestedComp from './nested-comp.component';

describe('nestedComp component', () => {

  beforeEach(() => {
    angular
      .module('nestedComp',[])
      .component('nestedComp', nestedComp);
    angular.mock.module('nestedComp');
  });

  it('should render nested-comp component', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<nested-comp></nested-comp>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

});
