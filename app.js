var express = require('express');
var app = express();

//module.exports = function(ready) {
	app.root = __dirname;
	require('./app/setup')(app, express);
	require('./app/router')(app);
	global.config = {
		port:3000,
		googleAnalytics: "bella"
	}
	var server = null;
	server = app.listen(config.port, function(){
		console.log('Express server listening on ' + config.host + ':' + config.port);
	});
//};
