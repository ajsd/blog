'use strict';

/**
 * @name EntriesCtrl
 * @param {angular.Scope} $scope
 * @param {BlogService} blogService
 * @constructor
 * @ngInject
 */
var EntriesCtrl = function($scope, blogService) {
  $scope.entries = [];

  blogService.search({'q': '*'}).
      success(function(result) {
        $scope.entries = result.entries;
      });
};
