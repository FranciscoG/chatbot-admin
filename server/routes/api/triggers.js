'use strict';
var Joi = require('joi');
const trigger = require(process.cwd() + '/server/triggers.js');


module.exports = function(server) {
  
  /**************************************************************
   * Triggers - find
   */
  
  const triggerFindHandler = function(request, reply) {
    trigger.find(server, request.params.name)
      .then( function(snapshot) {
        var val = snapshot.val();
        reply(val || 0);
      })
      .catch(function(err){
        server.logger.error(err);
        reply(0);
      });
  };

  server.route({
    method: 'GET',
    path: '/api/trigger/{name}',
    config : {
      handler: triggerFindHandler
    }
  });


  /**************************************************************
   * Triggers - update
   */
  
  const triggerUpdateHandler = function(request, reply) {
    
    var data = JSON.parse(request.payload.triggerObj);
    
    trigger.update(server, request.payload.triggerText, data)
      .then( function(snapshot) {
        reply('success');
      })
      .catch(function(err){
        server.logger.error(err);
        reply('fail');
      });
  };

  server.route({
    method: 'POST',
    path: '/api/trigger/update',
    config : {
      handler: triggerUpdateHandler,
      validate: {
        payload: {
          triggerText: Joi.string().required(),
          triggerObj : Joi.string().required()
        }
      }
    }
  });

};