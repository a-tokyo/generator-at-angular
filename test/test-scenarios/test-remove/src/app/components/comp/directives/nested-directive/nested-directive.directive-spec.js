import angular from 'angular';
import 'angular-mocks';

import * as nestedDirectiveDirective from './nested-directive.directive';

describe('nestedDirective directive', () => {

  beforeEach(() => {
    const dummyModule =  angular.module('dummyModule',[]);
    dummyModule.directive('nestedDirective', nestedDirectiveDirective);
    angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject(($rootScope, $compile) => {

    // const element =  $compile('<nested-directive></nested-directive>')($rootScope);
    // expect(element.html()).toContain('<h1>hello</h1>');
    // $rootScope.$digest();

  }));

});
