'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const log = bunyan.createLogger({name: "chatbot-admin"});
const config  = require( process.cwd() + '/private/config.js' );
const db = require( process.cwd() + '/server/db.js');

const server = new Hapi.Server({
  address: '127.0.0.1', 
  port: 8080,
  routes: {
    files: {
        relativeTo: Path.join(__dirname, 'public')
    }
  }
});

// add our config to the server object
server.decorate( 'server', 'config', config );

// add our logging to the server object
server.decorate( 'server', 'logger', log );

// add firebase db to the server object
server.decorate('server', 'db', db);

// load all our routes
require( process.cwd() + '/server/routes/index.js' )(server);

const provision = async () => {

  // register hapi-pino logger plugin
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: process.env.NODE_ENV !== 'production',
      logEvents: ['response']
    }
  })

  // register plugin that allows me to use persistant browser sessions
  try {
    await server.register({
        plugin: require('yar'),
        options: config.session
    });
  } catch(err) {
      console.error(err);
      process.exit(1);
  }

  // register Hapi's static file plugin
  await server.register(Inert);

  await server.start();

  console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

provision();