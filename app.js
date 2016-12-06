'use strict';
const Hapi = require('hapi');
const bunyan = require('bunyan');
const Inert = require('inert');
const log = bunyan.createLogger({name: "chatbot-admin"});

const server = new Hapi.Server();
server.log = log;

server.connection({
  port: 8080,
  host: '127.0.0.1'
});

server.register(Inert, () => {});

// load all our routes
var routes = require( process.cwd() + '/server/routes/index.js' )(server);

server.start((err) => {
  if (err) {
      throw err;
  }
  log.info(`Server running at: ${server.info.uri}`);
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