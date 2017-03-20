var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];
var WPAPI = require( 'wpapi' );
var meta = {};
var conta = [];

exports.get = function get(req, res) {
  res.header('Content-Type', 'text/txt');
  var str = "User-agent: *\nAllow: /\nDisallow: download/*\nsitemap: "+config.domain+"/sitemap.xml"
  res.send(str);
};
exports.getMeta = function getMeta(req, res) {
  console.log("getMeta");
  meta = {};
  conta = [];
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
  if (!req.query.generate){
    res.render("lpm/meta_test", {meta:config.meta.editions});
  } else {
    getMetaSingle(editions[conta.length],req);
    function getMetaSingle(val,req) {
      console.log("getMetaSingle 1 "+val);
      var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
      wp.myCustomResource = wp.registerRoute( 'wp/v2', '/meta_data/(?P<sez>)/(?P<edition>)' );
      wp.myCustomResource().edition(val).sez("editions").get(function( err, data ) {
        console.log("getMetaSingle 2");
        //console.log(data);
        meta[val] = data.meta.edition;
        conta.push(val);
        console.log('wp/v2/meta_data/editions/'+val);
        console.log(conta.length +" - "+editions.length);
        console.log(req.query.check);
        if (conta.length==editions.length) {
          if (req.query.check){
            res.render("lpm/meta_test", {meta:meta});
          } else {
            res.send(JSON.stringify(meta, null, 2));
          }
        } else {
          console.log("getMetaSingle 3 "+editions[conta.length]);
          getMetaSingle(editions[conta.length],req);
        }
      });
    }
  }

};