'use strict';
const pug = require('pug');
const Boom = require('boom');
const trigger = require(process.cwd() + '/server/triggers.js');

var linkify = function(str){
  if (typeof str !== 'string') {return str;}

  return str.replace(/https?:\/\/[^\s]+/i, function(match, p1, offset, string){
    return `<a href="${match}" target="_blank">${match}</a>`;
  });
};

var makeList = function(data) {
  var list = '';
  data.forEach(function(el){
    var trig = el.Trigger.replace(/:$/,'');
    var ret = linkify(el.Returns);

    list += `<li>
      <span class="trigger">${trig}</span>
      <span class="returns">${ret}</span>
      <span class="author">${el.Author}</span>
    </li>`;
  });
  return list;
};

module.exports = function(server) {

  const homePage = pug.compileFile(process.cwd() + '/server/views/home.pug');

  const handler = function (request, reply) {
    trigger.getAll(server)
      .then(function(snapshot){
        var result = [];
        snapshot.forEach(function(child) {
            result.push(child.val());
        });
        reply(homePage({allTrigs : makeList(result) }));
      })
      .catch(function(err){
        server.logger.error(err);
        reply(homePage());
      });

  };

  return server.route({
    method: 'GET',
    path: '/',
    handler: handler
  });

};