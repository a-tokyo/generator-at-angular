import angular from 'angular';
import 'angular-mocks';
import * as <%= componentNameCamel %> from './<%= componentName %>.component';

describe('<%= componentNameCamel %> component', () => {

  beforeEach(() => {
    angular
      .module('<%= componentNameCamel %>',[])
      .component('<%= componentNameCamel %>', <%= componentNameCamel %>);
    angular.mock.module('<%= componentNameCamel %>');
  });

  it('should render <%= componentName %> component', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<<%= componentName %>></<%= componentName %>>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

});
