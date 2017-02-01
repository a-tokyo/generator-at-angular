import componentTpl from './comp.component.html';

let compComponent = {
  templateUrl: componentTpl,
  controller: CompController,
  bindings: {}
};

function CompController($scope, $log) {
  'ngInject';
  $log.debug('Hello from' + 'Comp' + 'Controller (component)!');
}

export default compComponent;
