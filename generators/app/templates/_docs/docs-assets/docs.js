// Docs in JSON format
var docs =
{
  "components": [
    {"name": "test-component", "path": "test-component", "components": [], "directives": [], "services": [], "description": "Test component for Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid."},
    // Add new components above
  ],
  "directives": [
    {"name": "testDirective", "nameCamel": "testDirective", "path": "test-directive", "description": "Test directive for Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid."},
    // Add new directives above
  ],
  "services": [
    {"name": "store", "nameCamel": "store", "path": "store", "description": "Store service fetches and holds some application data like arrays for dropdowns and so on."},
    // Add new services above
  ],
  "pages": [
    {"name": "home", "route": "/", "state": "home", "description": "home page"},
    // Add new pages above
  ],
  "info": {"appName":"MyATApp", "port": 8080}
  // Add application info above
};

// generator-at-angular-docs angular application
var docsApp = angular.module('generator-at-angular-docs', []);
docsApp.controller('docsCtrl', function ($scope){
  // attaching appName to scope
  $scope.appName = docs.info.appName;
  // attaching docs to scope
  $scope.components = docs.components;
  $scope.directives = docs.directives;
  $scope.services = docs.services;
  $scope.pages = docs.pages;
  // Base href for app routes
  $scope.apphost = 'http://localhost:'+docs.info.port;
  // attaching currentYear to scope
  $scope.currentYear = new Date().getFullYear();
});
