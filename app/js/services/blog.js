'use strict';

/**
 * @name blogService
 * RPC service for the "blog" API.
 */
angular.module('main').service('blogService',
    function(jsonrpc) {
      var service = jsonrpc.newService('blog');
      this.search = service.createMethod('Search');
      this.save = service.createMethod('Save', {withCredentials: true});
    }
);
