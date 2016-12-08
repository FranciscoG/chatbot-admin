'use strict';
const pug = require('pug');
const Boom = require('boom');

module.exports = function(server) {

  const homePage = pug.compileFile(process.cwd() + '/server/views/home.pug');

  const handler = function (request, reply) {
      return reply(homePage());
  };

  return server.route({
    method: 'GET',
    path: '/',
    handler: handler
  });

};