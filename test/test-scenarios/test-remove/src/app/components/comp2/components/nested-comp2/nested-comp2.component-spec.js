import angular from 'angular';
import 'angular-mocks';
import * as nestedComp2 from './nested-comp2.component';

describe('nestedComp2 component', () => {

  beforeEach(() => {
    angular
      .module('nestedComp2',[])
      .component('nestedComp2', nestedComp2);
    angular.mock.module('nestedComp2');
  });

  it('should render nested-comp2 component', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<nested-comp2></nested-comp2>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

});
