import angular from 'angular';
import 'angular-mocks';

import * as <%= directiveNameCamel %>Directive from './<%= directiveName %>.directive';

describe('<%= directiveNameCamel %> directive', () => {

  beforeEach(() => {
      const dummyModule =  angular.module('dummyModule',[]);
      dummyModule.directive('<%= directiveNameCamel %>', <%= directiveNameCamel %>Directive);
      angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject(($rootScope, $compile) => {

    // const element =  $compile('<<%= directiveName %>></<%= directiveName %>>')($rootScope);
    // expect(element.html()).toContain('<h1>hello</h1>');
    // $rootScope.$digest();

  }));

});
