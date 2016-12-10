var helpers = require('./../helpers');

exports.get = function get(req, res) {
  if (req.url.indexOf('/it/')===0) req.params.lang = "it";
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getNew(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.meta_description) meta_data.meta['og_description'] = result.meta_description;
        res.render(config.prefix+'/'+'new', {data: result, meta_data:meta_data});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, "news", function( posttype ) {
      helpers.getAllNews(req, config.sez.news.limit, req.params.page ? req.params.page : 1, function( result ) {
        meta_data.meta.title = __("News") + " | " + meta_data.meta.name;
        res.render(config.prefix+'/'+'news', {data: result, meta_data:meta_data, posttype:posttype});
      });
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
