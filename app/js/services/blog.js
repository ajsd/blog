'use strict';

/**
 * @name blogService
 * @param jsonrpc
 * @constructor
 * @ngInject
 */
var BlogService = function(jsonrpc) {
  var service = jsonrpc.newService('blog');
  this.search = service.createMethod('Search');
};
