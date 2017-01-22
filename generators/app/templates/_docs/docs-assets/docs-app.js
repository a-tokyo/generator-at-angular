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
