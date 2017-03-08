var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];
var WPAPI = require( 'wpapi' );

exports.get = function get(req, res) {
  res.header('Content-Type', 'text/txt');
  var str = "User-agent: *\nAllow: /\nDisallow: download/*\nsitemap: "+config.domain+"/sitemap.xml"
  res.send(str);
};
exports.getMeta = function get(req, res) {
  var meta = {};
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/meta_data/(?P<sez>)/(?P<edition>)' );
  var editions = ["2017-amsterdam",
    "2016-amsterdam",
    "2015-rome",
    "2014-eindhoven",
    "2013-cape-town",
    "2013-rome",
    "2013-mex",
    "2012-rome",
    "2011-minsk",
    "2011-rome",
    "2010-rome",
    "2009-rome",
    "2008-mex",
    "2008-rome",
    "2007-rome",
    "2006-rome",
    "2005-rome",
    "2004-rome"];
  var conta = 0;
  editions.forEach(function (val,index,arr) {
    wp.myCustomResource().edition(val).sez("editions").get(function( err, data ) {
      meta[val] = data.meta.edition;
      conta++;
      if (conta==arr.length) res.send(JSON.stringify(meta, null, 2));
    });

  });
};