import angular from 'angular';
import 'angular-mocks';

import * as storeFactory from './store.factory';

describe('store service', () => {

  beforeEach(() => {
      const dummyModule = angular.module('dummyModule', []);
      dummyModule.factory('store', storeFactory);
      angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((store) => {

  //  expect(store.getData()).toEqual(3); //  Example test

  }));

});
