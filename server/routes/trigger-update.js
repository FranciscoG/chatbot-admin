'use strict';
const pug = require('pug');
var Joi = require('joi');


module.exports = function(server) {
  
  const handler = function(request, reply) {
    
    var data = JSON.parse(request.payload.triggerObj);

    var updateObj = {
      Author: data.Author,
      Returns: request.payload.triggerText,
      Trigger: data.Trigger,
      status: 'updated',
      lastUpdated : Date.now(),
      createdOn : data.createdOn,
      createdBy : data.createdBy
    };
    server.db.ref('triggers/'+data.Trigger)
      .set(updateObj)
      .then( function(snapshot) {
        reply('success');
      })
      .catch(function(){
        reply('fail');
      });
  };

  return server.route({
    method: 'POST',
    path: '/trigger/update',
    config : {
      handler: handler,
      validate: {
        payload: {
          triggerText: Joi.string().required(),
          triggerObj : Joi.string().required()
        }
      }
    }
  });

};