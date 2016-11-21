'use strict';
const pm2 = require('pm2');

module.exports = function(server) {

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      // do something with the home page will ya!
      
      pm2.describe('bot', function(err, pd){
        if (err) {
          console.error(err);
        }

        //reply(JSON.stringify(pd));
      });

    }
  });

};