import angular from 'angular';
import 'angular-mocks';

import * as directiveDirective from './directive.directive';

describe('directive directive', () => {

  beforeEach(() => {
    const dummyModule =  angular.module('dummyModule',[]);
    dummyModule.directive('directive', directiveDirective);
    angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject(($rootScope, $compile) => {

    // const element =  $compile('<directive></directive>')($rootScope);
    // expect(element.html()).toContain('<h1>hello</h1>');
    // $rootScope.$digest();

  }));

});
