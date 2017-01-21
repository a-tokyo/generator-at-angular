import angular from 'angular';
import 'angular-mocks';

describe('<%= directiveNameCamel %> directive', () => {
  beforeEach(() => {

      var dummyModule =  angular.module('dummyModule',[]);
      require('./<%= directiveName %>.directive')(dummyModule);
      angular.mock.module('dummyModule');

  });
  it('should...', angular.mock.inject(($rootScope, $compile) => { 

    // const element =  $compile('<<%= directiveName %>></<%= directiveName %>>')($rootScope);
    // expect(element.html()).toContain('<h1>hello</h1>');
    // $rootScope.$digest();

  }));
});
