// generator-at-angular-docs angular application
var docsApp = angular.module('generator-at-angular-docs', []);
// Docs main controller
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
  /*
   * replaceSlashWith2Underscores
   * takes a string as an input
   * replaces every '/' with '__'
   */
  $scope.replaceSlashWith2Underscores = function(string){
    return string.replace('/', '__');
  };
});
