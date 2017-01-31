import angular from 'angular';
import 'angular-mocks';

import * as nestedServiceFactory from './nested-service.factory';

describe('nestedService service', () => {

  beforeEach(() => {
    const dummyModule = angular.module('dummyModule', []);
    dummyModule.factory('nestedService', nestedServiceFactory);
    angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((nestedService) => {

  //  expect(nestedService.getData()).toEqual(3); //  Example test

  }));

});
