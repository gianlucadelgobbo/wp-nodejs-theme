var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.editions;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //console.log("result._post_template");
    helpers.getEdition(req, function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      if (result.post_title) {
        res.render(config.prefix+'/'+'edition'+(req.url.indexOf("/gallery/")>0 ? "_artists" : ""), {result: result, page_data:page_data, sessions:req.session.sessions,rientro:rientro});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.getArtist = function getArtist(req, res) {
  helpers.setSessions(req, function() {
    helpers.getEditionArtist(req, function( result ) {
      var page_data = fnz.setPageData(req, result);
      if (result.post_content.indexOf(">ERROR<")===-1) {
        res.render(config.prefix+'/'+'edition_artists', {result: result, page_data:page_data, sessions:req.session.sessions});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.getGallery = function getGallery(req, res) {
  helpers.setSessions(req, function() {
    helpers.getEditionArtistGallery(req, function( result ) {
      var page_data = fnz.setPageData(req, result);
      if (result.post_content.indexOf(">ERROR<")===-1) {
        result.post_content = result.post_content.replace(new RegExp('itemprop="url" href="/', 'g'), 'itemprop="url" href="'+config.domain+"/");
        res.render(config.prefix+'/'+'edition_artists', {result: result, page_data:page_data, sessions:req.session.sessions, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.setSessions(req, function() {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      helpers.getAll(req, config.sez.editions, config.sez.editions.limit, 1, function( results ) {
        var page_data = fnz.setPageData(req, posttype);
        res.render(config.prefix+'/'+'editions', {results: results, page_data:page_data, sessions:req.session.sessions, posttype:posttype});
      });
    });
  });
};
exports.getMeta = function getMeta(req, res) {
  var WPAPI = require( 'wpapi' );
  //console.log("getMeta");
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
      //console.log("getMetaSingle 1 "+val);
      var wp = new WPAPI({ endpoint: config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json' });
      wp.myCustomResource = wp.registerRoute( 'wp/v2', '/meta_data/(?P<sez>)/(?P<edition>)' );
      wp.myCustomResource().edition(val).sez("editions").get(function( err, data ) {
        //console.log("getMetaSingle 2");
        //console.log(data);
        meta[val] = data.meta.edition;
        conta.push(val);
        //console.log('wp/v2/meta_data/editions/'+val);
        //console.log(conta.length +" - "+editions.length);
        //console.log(req.query.check);
        if (conta.length==editions.length) {
          if (req.query.check){
            res.render("lpm/meta_test", {meta:meta});
          } else {
            require('jsonfile').writeFile(config.root+'/config/editions.json', meta, function(err) {
              config.meta.editions = meta;
              res.render("lpm/meta_test", {meta:config.meta.editions});
            });
          }
        } else {
          //console.log("getMetaSingle 3 "+editions[conta.length]);
          getMetaSingle(editions[conta.length],req);
        }
      });
    }
  }

};
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
