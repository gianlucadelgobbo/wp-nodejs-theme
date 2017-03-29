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

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
