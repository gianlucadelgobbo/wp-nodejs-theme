var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getAward(req, function( result ) {
      if(result && result['ID']) {
        meta_data.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
        if (result.featured) meta_data.image_src = result.featured.full;
        if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
        res.render(config.prefix+'/'+sez.pugdett, {result: result, meta_data:meta_data, baseurl:sez.baseurl,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, baseurl:sez.baseurl, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAll(req, sez, sez.limit, page, function( results ) {
        meta_data.title = posttype.post_title + " | " + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ")+ config.project_name;
        if (posttype.featured) meta_data.image_src = posttype.featured.full;
        if (posttype.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(posttype.meta_description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
