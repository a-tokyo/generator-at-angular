'use strict';
<% if (needsPartial) { %>
import directiveTpl from './<%= directiveName %>.html';
<% } %>
var  <%= directiveNameCamel %>Directive = {
    restrict: 'EA', <% if (needsPartial) { %>
    templateUrl: directiveTpl, <% } %>
    link: linkFn
  };

function linkFn(scope, elem, attrs, ngModelCtrl) {

}

export default <%= directiveNameCamel %>Directive;
