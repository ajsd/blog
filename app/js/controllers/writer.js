'use strict';

/**
 * @name WriterCtrl
 * Controller for the writer view.
 */
angular.module('main').controller('WriterCtrl',
    function($scope, $location, blogService) {
      var writer = $scope.writer = {};

      writer.md = '';
      writer.error = '';
      writer.saving = false;

      writer.save = function(md) {
        writer.error = '';
        writer.saving = true;
        blogService.save({md: md}).
            success(function() {
              writer.saving = false;
              $location.path('/');
            }).
            error(function(err) {
              writer.error = err.message;
              writer.saving = false;
            });
      };
    }
);
