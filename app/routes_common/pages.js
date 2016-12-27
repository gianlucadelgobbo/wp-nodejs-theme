var helpers = require('./../helpers');
var fnz = require('./../functions');

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPage(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
        res.render(pug, {result: result, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};
exports.getSubpage = function getSubpage(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPage(req, function( result ) {
      if(result['ID']) {
        console.log(global.getLocale());
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.post_excerpt) {
          meta_data.meta['og_description'] = fnz.makeExcerpt(result.post_excerpt, 160);
        } else {
          meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        }
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].pugpage ? config.sez.pages.conf[req.params.subpage].pugpage : config.sez.pages.conf.default.subpage);
        console.log("pug");
        console.log(pug);
        var itemtype = config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].itemtype ? config.sez.pages.conf[req.params.subpage].itemtype : config.sez.pages.conf.default.itemtype;
        console.log(itemtype);
        res.render(pug, {result: result, meta_data:meta_data, itemtype:itemtype,q:req.query.q,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};
exports.get404 = function get404(req, res) {
  console.log("get404");
  helpers.getMetaData(req, function( meta_data ) {
    res.render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
  });
};

exports.getTimeline = function getTimeline(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    req.params.page = "timeline";
    helpers.getPage(req, function( result ) {
      console.log(result);
      meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
      var year = parseInt(req.params.year ? req.params.year : new Date().getFullYear());
      helpers.getAllEditionsEvents(req, year, function( results ) {
        res.render(config.prefix+'/'+(config.sez.pages.conf.timeline.pugpage ? config.sez.pages.conf.timeline.pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : ""), {year: year, result: result, results:results, meta_data:meta_data, itemtype:config.sez.pages.conf.timeline.itemtype ? config.sez.pages.conf.timeline.itemtype : config.sez.pages.conf.default.itemtype});
      });
    });
  });
};


/*
exports.getSearch = function getSearch(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    res.render(config.prefix+'/search', {meta_data:meta_data, itemtype:"WebPage"});
  });
};

exports.postTimeline = function postTimeline(req, res) {
  var year = parseInt(req.params.year ? req.params.year : new Date().getFullYear());
  helpers.getAllEditionsEvents(req, year, function( data_timeline ) {
    res.render(config.prefix+'/'+(config.sez.pages.conf.timeline.pugpage ? config.sez.pages.conf.timeline.pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : ""), {year: year, data_timeline:data_timeline, itemtype:config.sez.pages.conf.timeline.itemtype ? config.sez.pages.conf.timeline.itemtype : config.sez.pages.conf.default.itemtype});
  });
};
*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
