import angular from 'angular';
import 'angular-mocks';

import * as serviceFactory from './service.factory';

describe('service service', () => {

  beforeEach(() => {
    const dummyModule = angular.module('dummyModule', []);
    dummyModule.factory('service', serviceFactory);
    angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((service) => {

  //  expect(service.getData()).toEqual(3); //  Example test

  }));

});
