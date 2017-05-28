var express = require('express');
var app = express();

global.config = require('config')[process.argv[3]];
config.root = app.root = __dirname;

if (process.argv[3]=="lpm") {
  require('jsonfile').readFile(config.root+'/config/editions_lpm.json', function(err, obj) {
    config.meta.editions = obj;
  });
}

if (process.argv[3]=="lcf") {
  require('jsonfile').readFile(config.root+'/config/editions_lcf.json', function(err, obj) {
    config.meta.editions = obj;
  });
}

if (process.argv[3]=="chromosphere") {
  require('jsonfile').readFile(config.root+'/config/editions_chromosphere.json', function(err, obj) {
    config.meta.editions = obj;
  });
}


require('./app/setup')(app, express);
require('./app/'+global.config.router)(app);

var server = null;

server = app.listen(config.port, function(){
  console.log('Express server listening on (' + config.prefix + ') ' + config.host + ':' + config.port);
});