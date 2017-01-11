'use strict';
const pug = require('pug');
const pm2 = require('pm2');
const moment = require('moment');
const sockio = require('socket.io');
var Convert = require('ansi-to-html');
var convert = new Convert({newline: true});

const Tail = require('tail').Tail;
var lastLine = require('last-line');

var pm2PublicModel = function(pm2_env) {
  return {
    unstable_restarts: pm2_env.unstable_restarts,
    restart_time: pm2_env.restart_time,
    pm_uptime: moment(pm2_env.pm_uptime).format('MMMM Do YYYY, h:mm:ss a'),
    status: pm2_env.status
  };
};

var showLogs = function(logfile, server) {
  
  // setup
  var io = sockio(server.listener);

  io.on('connection', function (socket) {

    lastLine(logfile, function (err, res) {
      // handle err (empty file?)
      if (err) {
        return socket.emit('log', 'error or file is empty');
      }
      socket.emit('log', convert.toHtml(res));
    });

    var options= {separator: /[\r]{0,1}\n/, fromBeginning: false, fsWatchOptions: {}, follow: true, logger: console};
    var log_out = new Tail(logfile, options);

    log_out.on("line", function(data) {
      socket.emit('log', convert.toHtml(data));
    });

    log_out.on("error", function(error) {
      console.log('ERROR: ', error);
      socket.emit('error', error);
    });

  });
};

module.exports = function(server) {

  const admin = pug.compileFile(process.cwd() + '/server/views/admin.pug');

  const handler = function (request, reply) {

    pm2.connect(function(err) {
      if (err) {
        console.error(err);
        return reply(admin({fail : 'true'}));
      }

      pm2.describe(server.config.process.name ,function(err, processDescription){
        if (err) {
          console.error(err);
          return reply(admin({fail : 'true'}));
        }

        if (!processDescription[0]) {
          return reply(admin({fail : 'true'}));
        }

        var outLogPath = processDescription[0].pm2_env.pm_out_log_path;
        showLogs(outLogPath, server);

        // console.log(processDescription);
        return reply(admin( pm2PublicModel(processDescription[0].pm2_env) ));
      });

    });
  };

  return server.route({
    method: 'GET',
    path: '/admin',
    handler: handler
  });

};

/*
pm2_env:
    { 
       unstable_restarts: 0,
       restart_time: 2,
       pm_uptime: 1484075809852,
       status: 'online',
       pm_err_log_path: '/Users/francisco.gutierrez1/.pm2/logs/bot-error-0.log',
       pm_out_log_path: '/Users/francisco.gutierrez1/.pm2/logs/bot-out-0.log',
    }
 */