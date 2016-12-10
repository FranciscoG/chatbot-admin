'use strict';
const pug = require('pug');

module.exports = function(server) {

  const admin = pug.compileFile(process.cwd() + '/server/views/admin.pug');

  const handler = function (request, reply) {
      return reply(admin());
  };

  return server.route({
    method: 'GET',
    path: '/admin',
    handler: handler
  });

};