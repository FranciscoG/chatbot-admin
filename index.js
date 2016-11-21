'use strict';

const Hapi = require('hapi');
const pm2 = require('pm2');

const server = new Hapi.Server();
 server.connection({
    port: 8080,
    host: '127.0.0.1'
});



server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        pm2.connect(function(err) {
            if (err) {
                console.error(err);
                process.exit(2);
          }

      pm2.describe('bot', function(err, pd){
        if (err) {
              console.error(err);
              process.exit(2);
            }

        //reply(JSON.stringify(pd));
      } );

    });

        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});