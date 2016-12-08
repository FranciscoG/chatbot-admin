'use strict';
const pug = require('pug');
var Joi = require('joi');


module.exports = function(server) {
  
  const handler = function(request, reply) {

    if (request.payload.code === server.config.onepass) {
      request.yar.set('isLoggedIn', 'true' );
      reply( 'success' );
    } else {
      request.yar.set('isLoggedIn', 'false' );
      reply('fail');
    }
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