'use strict';

import componentTpl from './footer.html';

function componentComponent($log) {
	'ngInject';

  var component = {
    restrict: 'E',
    templateUrl: componentTpl,
    controller: ComponentController,
    controllerAs: 'vm',
    bindToController: true
  };

  return component;

  function ComponentController () {
	  $log.debug('Hello from footer controller!');
  }

}

export default componentComponent;
