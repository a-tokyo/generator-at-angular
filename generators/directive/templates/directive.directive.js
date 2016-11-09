'use strict';

export default function (app) {

    app.directive('<%= directiveNameCamel %>', <%= directiveNameCamel %>Directive);

    function <%= directiveNameCamel %>Directive () {
        'ngInject';

        return {
            restrict: 'EA',
            require: 'ngModel',
            link: linkFn
        };

        function linkFn (scope, elem, attrs, ngModelCtrl) {

        }
    }
}
