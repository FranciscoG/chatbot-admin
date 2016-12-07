'use strict';
const pug = require('pug');

module.exports = function(server) {

  const loginPage = pug.compileFile(process.cwd() + '/server/views/login.pug');
  const homePage = pug.compileFile(process.cwd() + '/server/views/home.pug');

  // force everyone to the login page if they're not logged in
  server.ext({
      type: 'onPreResponse',
      method: function (request, reply) {
        var isLoggedIn = request.yar.get('isLoggedIn');
        console.log(isLoggedIn);
        return reply.continue();
      }
  });

  const handler = function (request, reply) {
    var isLoggedIn = request.yar.get('isLoggedIn');
    if (isLoggedIn === 'true') {
      return reply(homePage());
    } else {
      return reply(loginPage());
    }
    
  };

  return server.route({
    method: 'GET',
    path: '/',
    handler: handler
  });

};