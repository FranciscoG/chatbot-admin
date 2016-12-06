'use strict';
const pug = require('pug');
var Joi = require('joi');


module.exports = function(server) {
  
  const handler = function(req, reply) {

    if (req.payload.code === 'test') {
      req.session.isLoggedIn = true;
      reply( 'yes' );
    }
  };

  return server.route({
    method: 'POST',
    path: '/login',
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