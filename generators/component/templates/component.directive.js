'use strict';

import componentTpl from './component.html';

function <%= props.componentName %>Component($log) {
	'ngInject';

  var component = {
    restrict: 'E',
    templateUrl: componentTpl,
    controller: <%= props.componentName %>Controller,
    controllerAs: 'vm',
    bindToController: true
  };

  return component;

  function <%= props.componentName %>Controller () {
	  $log.debug('Hello from' + <%= props.componentName %> + 'controller!');
  }

}

export default <%= props.componentName %>Component;
