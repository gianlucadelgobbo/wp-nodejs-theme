var helpers = require('../../helpers');
var fnz = require('../../functions')

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    console.log("result._post_template");
    helpers.getEdition(req, function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      console.log("rientro");
      //console.log(result);
      if (result.post_title) {
        meta_data.title = (result.post_title ? result.post_title+ " | " : "") + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
        if (result.featured) meta_data.image_src = result.featured.full;
        if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
        res.render(config.prefix+'/'+'edition'+(req.url.indexOf("/gallery/")>0 ? "_artists" : ""), {result: result, meta_data:meta_data,rientro:rientro});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};

exports.getArtist = function getArtist(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getEditionArtist(req, function( result ) {
      if (result.post_content.indexOf(">ERROR<")===-1) {
        console.log(result._post_template);
        meta_data.title = (result.post_title ? result.post_title+ " | " : "") + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
        res.render(config.prefix+'/'+'edition_artists', {result: result, meta_data:meta_data});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};

exports.getGallery = function getGallery(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getEditionArtistGallery(req, function( result ) {
      if (result.post_content.indexOf(">ERROR<")===-1) {
        meta_data.title = (result.post_title ? result.post_title+ " | " : "") + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
        result.post_content = result.post_content.replace(new RegExp('itemprop="url" href="/', 'g'), 'itemprop="url" href="'+config.domain+"/");
        console.log(result.post_content);
        res.render(config.prefix+'/'+'edition_artists', {result: result, meta_data:meta_data, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getAll(req, config.sez.editions, config.sez.editions.limit, 1, function( results ) {
      console.log(results);
      meta_data.title = "Editions | " + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
      res.render(config.prefix+'/'+'editions', {results: results, meta_data:meta_data});
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
