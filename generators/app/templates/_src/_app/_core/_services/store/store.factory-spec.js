import angular from 'angular';
import 'angular-mocks';

describe('store service', () => {

  beforeEach(() => {
      const dummyModule = angular.module('dummyModule', []);
      require('./store.factory')(dummyModule);
      angular.mock.module('dummyModule');
  });

  it('should...', angular.mock.inject((store) => {

  //  expect(store.getData()).toEqual(3); //  Example test
  
  }));
  
});
