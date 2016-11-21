'use strict';
const Hapi = require('hapi');
const pm2 = require('pm2');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});

// everything inside PM2 because without pm2 there is no point to this
pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  const server = new Hapi.Server();
  server.log = log;

  server.connection({
    port: 8080,
    host: '127.0.0.1'
  });

  var routes = require( process.cwd() + '/routes' )(server);

  server.start((err) => {
    if (err) {
        throw err;
    }
    log.info(`Server running at: ${server.info.uri}`);
  });

});

function disconnect(err){
  log.error(err);
}

process.on('exit', disconnect); //automatic close
process.on('SIGINT', disconnect); //ctrl+c close
process.on('uncaughtException', disconnect);
process.on('message', function(msg) {  
  if (msg === 'shutdown') {
    disconnect(msg);
  }
});