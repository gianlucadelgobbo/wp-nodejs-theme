var express = require('express');
var app = express();

var sites = ["flyer","lpm"];

global.config = require('config')[sites[1]];

//console.log(config);

app.root = __dirname;

require('./app/setup')(app, express);
require('./app/router')(app);

var server = null;

server = app.listen(config.port, function(){
	console.log('Express server listening on ' + config.host + ':' + config.port);
});