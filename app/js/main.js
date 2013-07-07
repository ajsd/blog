'use strict';

/** The main module. */
angular.module('main', [
  /* Dependencies */
  'angular-markdown',
  'jsonrpc'
]);

/** The server hostname. */
angular.module('main').constant('serverHost',
      (window.location.href.indexOf('localhost') > -1) ?
          'http://localhost:8080' :
          'https://arunjit-goblog.appspot.com');

/** Main configuration. */
angular.module('main').config(
    function($routeProvider, $locationProvider, jsonrpcProvider, serverHost) {
      jsonrpcProvider.setBasePath(serverHost + '/rpc');
      $locationProvider.html5Mode(false);
      $routeProvider.
          when('/', {
            templateUrl: 'views/entries.html',
            controller: 'EntriesCtrl'
          }).
          when('/writer', {
            templateUrl: 'views/writer.html',
            controller: 'WriterCtrl'
          }).
          otherwise({redirectTo: '/'});
    }
);
