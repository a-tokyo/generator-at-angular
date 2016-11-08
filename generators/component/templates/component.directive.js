'use strict';

import componentTpl from './<%= componentName %>.html';

function <%= componentNameCamel %>Component($log) {
	'ngInject';

  var component = {
    restrict: 'E',
    templateUrl: componentTpl,
    controller: <%= controllerName %>Controller
  };

  return component;

  function <%= controllerName %>Controller () {
	  $log.debug('Hello from' + '<%= controllerName %>' + 'Controller!');
  }

}

export default <%= componentNameCamel %>Component;
