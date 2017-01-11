'use strict';
var Joi = require('joi');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(server) {
  
  const handler = function(request, reply) {
    
    // Load hash from your password DB.
    bcrypt.compare(request.payload.code, server.config.hash, function(err, res) {
      if (res === true) {
        request.yar.set('isLoggedIn', 'true' );
        reply( 'success' );
      } else {
        request.yar.set('isLoggedIn', 'false' );
        reply('fail');
      }
    });
  };

  return server.route({
    method: 'POST',
    path: '/api/login',
    config : {
      handler: handler,
      validate: {
        payload: {
          code: Joi.string().required(),
        }
      }
    }
  });

};