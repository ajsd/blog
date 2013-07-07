/**
 * @name blogService
 * @param {jsonrpc} jsonrpc
 * @constructor
 * @ngInject
 */
function BlogService(jsonrpc) {
  var service = jsonrpc.newService('blog');
  this.search = service.createMethod('Search');
}
BlogService['$inject'] = ['jsonrpc'];
