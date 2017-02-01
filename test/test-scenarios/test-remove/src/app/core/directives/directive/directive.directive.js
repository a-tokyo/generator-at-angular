
function directiveDirective() {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {},
    link: linkFn
  };

  function linkFn(scope, elem, attrs, fn) {

  }
}

export default directiveDirective;
