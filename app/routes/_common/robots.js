var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];

exports.get = function get(req, res) {
  res.header('Content-Type', 'text/txt');
  var str = "User-agent: *\nAllow: /\nsitemap: "+config.domain+"/sitemap.xml"
  res.send(str);
};