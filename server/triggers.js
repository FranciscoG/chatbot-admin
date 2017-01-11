'use strict';

module.exports =  {

    find : function(server, trigger){
      return server.db.ref('triggers')
        .orderByChild('Trigger')
        .equalTo(trigger + ':')
        .once('value');
    },

    getAll : function(server) {
      return server.db.ref('triggers')
        .orderByChild('Trigger')
        .once('value');
    },

    update : function(server, newText, data) {
      var key = Object.keys(data)[0];

      var updateObj = {
        Author: data[key].Author,
        Returns: newText,
        Trigger: data[key].Trigger,
        status: 'updated',
        lastUpdated : Date.now(),
        createdOn : data[key].createdOn || null,
        createdBy : data[key].createdBy || 'unknown'
      };

      return server.db.ref('triggers/'+key).set(updateObj);
    }

};