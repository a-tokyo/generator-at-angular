<% if (needsPartial) { %>
import directiveTpl from './<%= directiveName %>.html';
<% } %>
function <%= directiveNameCamel %>Directive() {
    'ngInject';

return {
    restrict: 'EA',
    scope: {},<% if (needsPartial) { %>
    templateUrl: directiveTpl, <% } %>
    link: linkFn
  };

function linkFn(scope, elem, attrs, fn) {

  }
}

export default <%= directiveNameCamel %>Directive;
