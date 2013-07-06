'use strict';

/** main Module */
var main = angular.module('main', ['angular-markdown', 'jsonrpc']);

main.constant(
    'serverHost',
    (window.location.href.indexOf('localhost') > -1) ?
        'http://localhost:8080' :
        'https://arunjit-goblog.appspot.com');

main.config([
    '$routeProvider', '$locationProvider', 'jsonrpcProvider', 'serverHost',
    function($routeProvider, $locationProvider, jsonrpcProvider, serverHost) {
      jsonrpcProvider.setBasePath(serverHost + '/rpc');
      $locationProvider.html5Mode(false);
      $routeProvider.
          when('/', {
            templateUrl: 'views/entries.html',
            controller: 'EntriesCtrl'
          }).
          when('/writer', {
            templateUrl: 'views/writer.html'
          }).
          otherwise({redirectTo: '/'});
    }
]);

main.run(['$rootScope', 'serverHost', function($rootScope, serverHost) {
  $rootScope.serverHost = serverHost;
  $rootScope.baseHref = window.location.href.replace(/\/(?:#\/.+)?$/, '');
}]);

main.service('blogService', BlogService);
main.controller('EntriesCtrl', EntriesCtrl);
