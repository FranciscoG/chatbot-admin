'use strict';
const pug = require('pug');
var Joi = require('joi');


module.exports = function(server) {
  
  const handler = function(request, reply) {
    server.db.ref('triggers')
      .orderByChild('Trigger')
      .equalTo(request.payload.trigger + ':')
      .once('value')
      .then( function(snapshot) {
        var val = snapshot.val();
        reply(val || 0);
      })
      .catch(function(){
        reply(0);
      });
  };

  return server.route({
    method: 'POST',
    path: '/trigger/find',
    config : {
      handler: handler,
      validate: {
        payload: {
          trigger: Joi.string().required(),
        }
      }
    }
  });

};