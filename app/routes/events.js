var helpers = require('./../helpers');
var fnz = require('./../functions');

var sez = config.sez.events;

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getEvent(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        res.render(config.prefix+'/'+sez.pugdett, {result: result, meta_data:meta_data, baseurl:sez.baseurl, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, baseurl:sez.baseurl, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, sez.post_type, function( posttype ) {
      helpers.getAllEvents(req, sez.limit, req.params.page ? req.params.page : 1, function( results ) {
        meta_data.meta.title = __("Live Visuals") + " | " + meta_data.meta.name;
        meta_data.meta['og_description'] = fnz.makeExcerpt(posttype.description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype,page:req.params.page ? req.params.page : 1});
      });
    });
  });
};

exports.getTag = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, sez.post_type, function( posttype ) {
      helpers.getAllEventsByTag(req, sez.limit, req.params.page ? req.params.page : 1, function( results ) {
        meta_data.meta.title = __("Live Visuals") + " #"+req.params.tag+" | " + meta_data.meta.name;
        meta_data.meta['og_description'] = fnz.makeExcerpt(__("Live Visuals") + " #"+req.params.tag+". "+posttype.description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype, tag:req.params.tag});
      });
    });
  });
};

exports.getAllTags = function getAllTags(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, sez.post_type, function( posttype ) {
      meta_data.meta.title = __("Live Visuals") + " TAGS | " + meta_data.meta.name;
      meta_data.meta['og_description'] = fnz.makeExcerpt(__("Live Visuals") + " TAGS. "+posttype.description, 160);
      res.render(config.prefix+'/'+sez.puglist, {meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype});
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
