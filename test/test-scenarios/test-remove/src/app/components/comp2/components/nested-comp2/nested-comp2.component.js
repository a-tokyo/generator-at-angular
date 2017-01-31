import componentTpl from './nested-comp2.component.html';

let nestedComp2Component = {
  templateUrl: componentTpl,
  controller: NestedComp2Controller,
  bindings: {}
};

function NestedComp2Controller($scope, $log) {
  'ngInject';
  $log.debug('Hello from' + 'NestedComp2' + 'Controller (component)!');
}

export default nestedComp2Component;
