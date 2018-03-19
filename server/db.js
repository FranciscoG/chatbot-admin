'use strict';
var admin = require("firebase-admin");
const serviceAccount = process.cwd() + '/private/serviceAccountCredentials.json';
const config  = require( process.cwd() + '/private/config.js' );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE.BASEURL
});

module.exports = admin.database();