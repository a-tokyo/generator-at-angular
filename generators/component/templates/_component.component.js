import componentTpl from './<%= componentName %>.component.html';

var <%= componentNameCamel %>Component = {
    templateUrl: componentTpl,
    controller: <%= controllerName %>Controller,
    bindings: {}
};

function <%= controllerName %>Controller($scope, $log) {
    'ngInject';
    $log.debug('Hello from' + '<%= controllerName %>' + 'Controller (component)!');
}

export default <%= componentNameCamel %>Component;
