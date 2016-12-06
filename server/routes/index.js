"use strict";

module.exports = function(server) {
  
  // static content route
  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: { path: './public', listing: false, index: true }
      }
  });

  var home = require(process.cwd() + '/server/routes/home.js')(server);
  var login = require(process.cwd() + '/server/routes/login.js')(server);

};