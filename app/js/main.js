'use strict';

/** main Module */
angular.module('main', ['angular-markdown', 'jsonrpc']).
    constant('serverHost',
      (window.location.href.indexOf('localhost') > -1) ?
          'http://localhost:8080' :
          'https://arunjit-goblog.appspot.com').
    config(function(
        $routeProvider,
        $locationProvider,
        jsonrpcProvider,
        serverHost) {
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
    });
