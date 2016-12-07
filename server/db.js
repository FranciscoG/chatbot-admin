'use strict';
var admin = require("firebase-admin");
const serviceAccount = process.cwd() + '/private/serviceAccountCredentials.json';
const config  = require( process.cwd() + '/private/config.js' );

module.exports.register = function (server, options, next)  {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: options.BASEURL
  });

  server.decorate( 'server', 'db', admin.database() );

  return next();
};

module.exports.register.attributes = {
    pkg: require(process.cwd() +'/package.json')
};