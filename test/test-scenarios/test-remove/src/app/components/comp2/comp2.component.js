import componentTpl from './comp2.component.html';

let comp2Component = {
  templateUrl: componentTpl,
  controller: Comp2Controller,
  bindings: {}
};

function Comp2Controller($scope, $log) {
  'ngInject';
  $log.debug('Hello from' + 'Comp2' + 'Controller (component)!');
}

export default comp2Component;
