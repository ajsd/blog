'use strict';

/**
 * @name EntriesCtrl
 * Controller for the entries view.
 */
angular.module('main').controller('EntriesCtrl',
    function($scope, blogService) {
      $scope.entries = [];

      blogService.search({q: '*'}).
          success(function(result) {
            $scope.entries = result.entries;
          });
    }
);
