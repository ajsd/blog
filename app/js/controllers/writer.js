'use strict';

/**
 * @name WriterCtrl
 * @param {angular.Scope} $scope
 * @param {angular.Location} $location
 * @param {BlogService} blogService
 * @constructor
 * @ngInject
 */
function WriterCtrl($scope, $location, blogService) {
  $scope.writer = this;

  this.md = '';
  this.error = '';
  this.saving = false;

  this.save = function(md) {
    var self = this;
    this.error = '';
    this.saving = true;
    blogService.save({md: md}).
        success(function() {
          self.saving = false;
          $location.path('/');
        }).
        error(function(err) {
          self.error = err.message;
          self.saving = false;
        });
  };
}
WriterCtrl.$inject = ['$scope', '$location', 'blogService'];
