var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];

exports.get = function get(req, res) {
  res.header('Content-Type', 'text/xml');
  var now = new Date()
  now.setHours(now.getHours() - 4)
  function ISODateString(d) {
     function pad(n) {return n<10 ? '0'+n : n}
     return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth() + 1)+'-'+ pad(d.getUTCDate())+'T'+ pad(d.getUTCHours())+':'+ pad(d.getUTCMinutes())+':'+ pad(d.getUTCSeconds())+'+01:00'
  }
  var isodate = ISODateString(now)

  if (req.url == "/sitemap.xml") {
    console.log(req.url);
    res.render(config.prefix+'/sitemap', {isodate:isodate});

  } else if (req.url == "/sitemap-home.xml") {
    console.log(req.url);
    res.render('_common/sitemap-home', {isodate:isodate});

  } else if (req.url == "/sitemap-pages.xml") {
    console.log(req.url);
    res.render('_common/sitemap-pages', {isodate:isodate});

  } else if (req.params.taxonomy) {
    console.log(req.params.taxonomy);
    helpers.getPostType(req, req.params.taxonomy, function( results ) {
      res.render('_common/sitemap-taxonomy', {results:results, isodate:isodate});
    });

  } else if (req.params.edition) {
    console.log(req.params.edition);
    helpers.getMetaData(req, function( result ) {
      res.render('_common/sitemap-edition', {result:result, isodate:isodate});
    });

  } else if (req.params.exhibition) {
    console.log(req.params.exhibition);
    helpers.getMetaData(req, function( result ) {
      res.render('_common/sitemap-exhibition', {result:result, isodate:isodate});
    });

  } else if (req.params.posttype) {
    console.log(config.sez[req.params.posttype]);
    helpers.getAll(req, config.sez[req.params.posttype], -1, 1, function( results ) {
      if (req.params.posttype == "exhibitions") {
        res.render('_common/sitemap-exhibitions', {results:results, isodate:isodate});
      } else if (req.params.posttype == "editions") {
        res.render('_common/sitemap-editions', {results:results, isodate:isodate});
      } else {
        res.render('_common/sitemap-posttype', {results:results, isodate:isodate});
      }
    });

  } else if (req.params.users) {
    console.log(req.params.users);
    helpers.getAllUsers(req, req.params.users, function( results ) {
      res.render('_common/sitemap-users', {results: results, baseurl:config.sitemap.users[req.params.users].baseurl});
    });
  }
};

exports.getAll = function getAll(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAllAward(req, sez.limit, page, function( results ) {
        meta_data.meta.title = __("Awards and Grants") + " | " + meta_data.meta.name;
		meta_data.meta['og_description'] = fnz.makeExcerpt(posttype.description, 160);
        res.render(config.prefix+'/'+sez.puglist, {results: results, meta_data:meta_data, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
