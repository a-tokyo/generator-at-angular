'use strict';

import componentTpl from './<%= componentName %>.html';

function <%= componentNameCamel %>Component($log) {
	'ngInject';

  var component = {
		templateUrl: componentTpl,
		controller: <%= controllerName %>Controller,
		bindings: {}
  };

  return component;

  function <%= controllerName %>Controller ($scope) {
	  $log.debug('Hello from' + '<%= controllerName %>' + 'Controller!');
  }

}

export default <%= componentNameCamel %>Component;
