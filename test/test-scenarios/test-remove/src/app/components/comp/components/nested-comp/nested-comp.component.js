import componentTpl from './nested-comp.component.html';

let nestedCompComponent = {
  templateUrl: componentTpl,
  controller: NestedCompController,
  bindings: {}
};

function NestedCompController($scope, $log) {
  'ngInject';
  $log.debug('Hello from' + 'NestedComp' + 'Controller (component)!');
}

export default nestedCompComponent;
