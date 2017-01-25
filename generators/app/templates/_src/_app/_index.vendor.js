// node_modules
import 'angular';

import 'angular-ui-router';

<% for(let i=0; i<importList.length; i++) { %>
import '<%= importList[i] %>';
<% } %>


// local scripts
//import "../assets/js/...";
