var helpers = require('./../helpers');
var fnz = require('./../functions');

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getWeb(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        res.render(config.prefix+'/'+'web', {data: result, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, "web-and-mobile", function( posttype ) {
      helpers.getAllWeb(req, config.sez.web.limit, req.params.page ? req.params.page : 1, function( result ) {
        meta_data.meta.title = "Web & Mobile | " + meta_data.meta.name;
        meta_data.meta['og_description'] = fnz.makeExcerpt(posttype.description, 160);
        res.render(config.prefix+'/'+'webs', {data: result, meta_data:meta_data, posttype:posttype});
      });
    });
  });
};

exports.getTag = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, "web-and-mobile", function( posttype ) {
      helpers.getAllWebByTag(req, config.sez.web.limit, req.params.page ? req.params.page : 1, function( result ) {
        meta_data.meta.title = "Web & Mobile #"+req.params.tag+" | " + meta_data.meta.name;
        meta_data.meta['og_description'] = fnz.makeExcerpt("Web & Mobile #"+req.params.tag+". "+posttype.description, 160);
        res.render(config.prefix+'/'+'webs', {data: result, meta_data:meta_data, posttype:posttype});
      });
    });
  });
};

exports.getAllTags = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPostType(req, "web-and-mobile", function( posttype ) {
      meta_data.meta.title = "Web & Mobile TAGS | " + meta_data.meta.name;
      meta_data.meta['og_description'] = fnz.makeExcerpt("Web & Mobile TAGS. "+posttype.description, 160);
      res.render(config.prefix+'/'+'webs', {meta_data:meta_data, posttype:posttype});
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
