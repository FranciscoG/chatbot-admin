
module.exports = function(server) {

  const handler = function (request, reply) {
      reply('<h1>Commands</h1>');
  };

  return server.route({
    method: 'GET',
    path: '/commands',
    handler: handler
  });
};