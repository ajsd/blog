'use strict';

/**
 * @name blogService
 * @param {jsonrpc} jsonrpc
 * @constructor
 * @ngInject
 */
function BlogService(jsonrpc) {
  var service = jsonrpc.newService('blog');
  this.search = service.createMethod('Search');
  this.save = service.createMethod('Save');
}
BlogService.$inject = ['jsonrpc'];
