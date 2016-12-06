'use strict';
const pug = require('pug');
var sessions = require("client-sessions");

module.exports = function(server) {

  var requestSessionHandler = sessions({
      cookieName: 'session', // cookie name dictates the key name added to the request object
      secret: 'blargadeeblargblarg', // should be a large unguessable string
      duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
      activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
      cookie: {
        maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: true, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
      }
  });

  server.ext({
    type: 'onPreResponse',
    method: function (request, reply) {
        var res = request.response;

        requestSessionHandler(request, res, function(){
          if (request.session.isLoggedIn) {
            console.log('user logged in');
          }
        });

        return reply.continue();
    }
  });

  const loginPage = pug.compileFile(process.cwd() + '/server/views/login.pug');
  const homePage = pug.compileFile(process.cwd() + '/server/views/home.pug');

  const handler = function (request, reply) {
    return reply(loginPage());
  };

  return server.route({
    method: 'GET',
    path: '/',
    handler: handler
  });

};