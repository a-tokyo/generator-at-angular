'use strict';
<% if (needsPartial) { %>
import directiveTpl from './<%= directiveName %>.html';
<% } %>
export default function (app) {

    app.directive('<%= directiveNameCamel %>', <%= directiveNameCamel %>Directive);

    function <%= directiveNameCamel %>Directive () {
        'ngInject';

        return {
            restrict: 'EA',<% if (needsPartial) { %>
            templateUrl: directiveTpl,<% } %>
            link: linkFn
        };

        function linkFn (scope, elem, attrs, ngModelCtrl) {

        }
    }
}
