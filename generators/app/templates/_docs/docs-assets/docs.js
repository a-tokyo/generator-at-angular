// generator-at-angular-docs angular application
var docsApp = angular.module('generator-at-angular-docs', []);
// Docs main controller
docsApp.controller('docsCtrl', function ($scope, $http){
  $http({'method': "GET", 'url': 'docs-assets/docs.json', cache: false}).then(function(res){
    // attaching appName to scope
    $scope.appName = res.data.info.appName;
    // attaching docs to scope
    $scope.components = res.data.components;
    $scope.directives = res.data.directives;
    $scope.services = res.data.services;
    $scope.pages = res.data.pages;
    // Base href for app routes
    $scope.apphost = 'http://localhost:'+res.data.info.port;
    // Hash prefix
    $scope.hashPrefix = '/#!';
  });
  // attaching currentYear to scope
  $scope.currentYear = new Date().getFullYear();
  /*
   * replaceSlashWith2Underscores
   * takes a string as an input
   * replaces every '/' with '__'
   */
  $scope.replaceSlashWith2Underscores = function(string){
    return string.replace(new RegExp('/', 'g'), '__');
  };
});
