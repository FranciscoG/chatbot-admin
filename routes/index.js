"use strict";

module.exports = function(server) {
  
  var home = require(process.cwd() + '/routes/home.js')(server);

};