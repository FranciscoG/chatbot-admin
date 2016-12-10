'use strict';

module.exports = function(server) {
  
  const handler = function(request, reply) {
    request.yar.clear('isLoggedIn');

    var isLoggedIn = request.yar.get('isLoggedIn');
    if (isLoggedIn) {
      reply('failure logging out');
    } else {
      reply('logged out');
    } 
    
  };

  return server.route({
    method: 'POST',
    path: '/api/logout',
    config : {
      handler: handler
    }
  });

};