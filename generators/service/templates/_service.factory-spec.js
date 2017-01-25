import angular from 'angular';
import 'angular-mocks';

import * as <%= serviceNameCamel %>Factory from './<%= serviceName %>.factory';

describe('<%= serviceNameCamel %> service', () => {

  beforeEach(() => {
    const dummyModule = angular.module('dummyModule', []);
    dummyModule.factory('<%= serviceNameCamel %>', <%= serviceNameCamel %>Factory);
    angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((<%= serviceNameCamel %>) => {

  //  expect(<%= serviceNameCamel %>.getData()).toEqual(3); //  Example test

  }));

});
