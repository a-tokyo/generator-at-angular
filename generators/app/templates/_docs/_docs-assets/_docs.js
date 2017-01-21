var docs =
{
  "components": [
    {"name": "test-component", "path": "test-component", "components": [], "directives": [], "services": [], "description": "Test component for Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid."},
  ],
  "directives": [
    {"name": "testDirective", "nameCamel": "testDirective", "path": "test-directive", "description": ""},
  ],
  "services": [
    {"name": "store", "nameCamel": "store", "path": "store", "description": "Store service fetches and holds some application data like arrays for dropdowns and so on."},
  ],
  "pages": [
    {"name": "home", "route": "/", "state": "home", "description": "home page"},
  ],
  "info": {"port": 8080}
};

$(document).ready(function () {
    //Setting copyright date
    document.getElementById('copyright-year').innerHTML = new Date().getFullYear();
    // preparing to loop over json file extracting the data and writing it to html
    // var componentCurrIndex;
    // var directiveCurrIndex;
    // var serviceCurrIndex;
    // var pageCurrIndex;
});


  var App = angular.module('docs', []);
  App.controller('docsCtrl', function ctrl($scope){
    $scope.components = docs.components;
    $scope.directives = docs.directives;
    $scope.services = docs.services;
    $scope.pages = docs.pages;
    // Base href for app
    $scope.apphost = 'http://localhost:'+docs.info.port;
  });
