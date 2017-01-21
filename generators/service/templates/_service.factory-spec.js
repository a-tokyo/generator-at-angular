import angular from 'angular';
import 'angular-mocks';

describe('<%= serviceNameCamel %> service', () => {

  beforeEach(() => {
      const dummyModule = angular.module('dummyModule', []);
      require('./<%= serviceNameCamel %>.factory')(dummyModule);
      angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((<%= serviceNameCamel %>) => {

  //  expect(<%= serviceNameCamel %>.getData()).toEqual(3); //  Example test
  
  }));

});
