var express = require('express');
var app = express();

global.config = require('config')[process.argv[3]];

config.root = app.root = __dirname;

require('./app/setup')(app, express);
require('./app/'+global.config.router)(app);

var server = null;

server = app.listen(config.port, function(){
  console.log('Express server listening on (' + config.prefix + ') ' + config.host + ':' + config.port);
});