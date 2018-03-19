"use strict";
const Boom = require('boom');

module.exports = function(server) {
  
  // static content route
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true,
        }
    }
  });

  // Authentication pre-check on every request
  server.ext({
      type: 'onPreResponse',
      method: function (request, reply) {

        // if request is a static content file then we also allow it
        // console.log(request.response.variety, ':', request.response.source.path);
        if (request.response.variety === 'file') {
          return reply.continue();
        }

        var isLoggedIn = request.yar.get('isLoggedIn');
        // convert to bool if it's using the string version
        isLoggedIn = isLoggedIn === 'true' ? true : isLoggedIn;
        isLoggedIn = isLoggedIn === 'false' ? false : isLoggedIn;

        // only return 401 on api routes
        // disregard login and logout, those should be public
        if (request.route.path.indexOf('/api') === 0 && 
            request.route.path !== '/api/login' &&
            request.route.path !== '/api/logout') {
          if (!isLoggedIn) {
            return reply(Boom.unauthorized('unauthorized request'));
          } else {
            return reply.continue();
          }
        }

        // prevent redirect loop on /login
        if (request.route.path === '/login') {
          return reply.continue();
        }
        
        // redirect to login on all other pages
        if (!isLoggedIn) {
          return reply.redirect('/login');
        } else {
          return reply.continue();
        }

      }
  });

  // pages
  var home = require(process.cwd() + '/server/routes/home.js')(server);
  var login = require(process.cwd() + '/server/routes/login.js')(server);
  
  // api routes
  var api_login = require(process.cwd() + '/server/routes/api/login.js')(server);
  var api_logout = require(process.cwd() + '/server/routes/api/logout.js')(server);
  var api_triggers = require(process.cwd() + '/server/routes/api/triggers.js')(server);

};