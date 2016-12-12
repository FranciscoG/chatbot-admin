'use strict';
const Hapi = require('hapi');
const bunyan = require('bunyan');
const Inert = require('inert');
const log = bunyan.createLogger({name: "chatbot-admin"});
const config  = require( process.cwd() + '/private/config.js' );
const db = require( process.cwd() + '/server/db.js');

const server = new Hapi.Server();

server.connection(config.connection);

// register plugin so I can display static content
server.register(Inert, () => {});

// register plugin that allows me to use persistant browser sessions
server.register({
    register: require('yar'),
    options: config.session
}, function (err) { });

// register firebase as a plugin
server.register({
    register: db,
    options: {
      BASEURL : config.FIREBASE.BASEURL
    }
}, (err) => {
   if (err) {
       console.log('Failed loading db plugin');
   }
});

// add our config to the server object
server.decorate( 'server', 'config', config );

// add our logging to the server object
server.decorate( 'server', 'logger', log ); 

// load all our routes
var routes = require( process.cwd() + '/server/routes/index.js' )(server);

// guess what this does?
server.start((err) => {
  if (err) {
      throw err;
  }
  server.logger.info(`Server running at: ${server.info.uri}`);
});

function disconnect(err){
  log.error(err);
  process.exit(2);
}

process.on('exit', disconnect); //automatic close
process.on('SIGINT', disconnect); //ctrl+c close
process.on('uncaughtException', disconnect);
process.on('message', function(msg) {  
  if (msg === 'shutdown') {
    disconnect(msg);
  }
});