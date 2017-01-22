var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.exhibitions;

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    console.log("result._post_template");
    helpers.getExhibition(req, function( result ) {
      console.log("result._post_template2");
      //console.log(result);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'exhibition', {result: result, meta_data:meta_data, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAll(req, sez, sez.limit, page, function( results ) {
        meta_data.meta.title = __("Exhibitions") + " | " + meta_data.meta.name;
        console.log("stocazzo");
        console.log(posttype);
        console.log("stocazzo");
        meta_data.meta.title = posttype.post_title + " | " + meta_data.meta.name;
        if (posttype.featured) meta_data.meta['image_src'] = posttype.featured.full;
        if (posttype.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(posttype.meta_description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};

exports.getArtist = function getArtist(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getExhibitionArtist(req, function( result ) {
      console.log(result._post_template);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'exhibition_artists', {result: result, meta_data:meta_data});
    });
  });
};
/*

exports.getGallery = function getGallery(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getExhibitionArtistGallery(req, function( result ) {
      console.log(result._post_template);
      meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
      res.render(config.prefix+'/'+'exhibition_artists', {result: result, meta_data:meta_data});
    });
  });
};
*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
