'use strict';
<% if (needsPartial) { %>
import directiveTpl from './<%= directiveName %>.html';
<% } %>
var  <%= directiveNameCamel %>Directive = {
    restrict: 'EA',
    scope: {},<% if (needsPartial) { %>
    templateUrl: directiveTpl, <% } %>
    link: linkFn
  };

function linkFn(scope, elem, attrs, fn) {

}

export default <%= directiveNameCamel %>Directive;
