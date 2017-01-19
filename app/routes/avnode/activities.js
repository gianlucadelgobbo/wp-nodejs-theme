var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.activities;

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    console.log("result._post_template");
    helpers.getActivity(req, function( result ) {
      console.log("result._post_template2");
      //console.log(result);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'activity', {result: result, meta_data:meta_data, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAll(req, sez, sez.limit, page, function( results ) {
        meta_data.meta.title = __("Activities") + " | " + meta_data.meta.name;
        console.log("stocazzo");
        console.log(posttype);
        console.log("stocazzo");
        if (posttype.description!="") meta_data.meta['og_description'] = fnz.makeExcerpt(posttype.description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};

exports.getArtist = function getArtist(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getActivityArtist(req, function( result ) {
      console.log(result._post_template);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'activity_artists', {result: result, meta_data:meta_data});
    });
  });
};
/*

exports.getGallery = function getGallery(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getActivityArtistGallery(req, function( result ) {
      console.log(result._post_template);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'activity_artists', {result: result, meta_data:meta_data});
    });
  });
};
*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
