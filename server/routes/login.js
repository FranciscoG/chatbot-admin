'use strict';
const pug = require('pug');

module.exports = function(server) {

  const loginPage = pug.compileFile(process.cwd() + '/server/views/login.pug');

  const handler = function (request, reply) {
    return reply(loginPage());
  };

  return server.route({
    method: 'GET',
    path: '/login',
    handler: handler
  });

};