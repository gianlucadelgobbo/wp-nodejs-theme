var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez["awards-and-grants"];

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    res.header('Content-Type', 'text/xml');
    var now = new Date();
    now.setHours(now.getHours() - 4);
    var isodate = fnz.ISODateString(now);

    if (req.url == "/sitemap.xml") {
      //console.log(req.url);
      res.render(config.prefix+'/sitemap', {isodate:isodate});

    } else if (req.url == "/sitemap-home.xml") {
      //console.log(req.url);
      res.render('_common/sitemap-home', {isodate:isodate});

    } else if (req.url == "/sitemap-pages.xml") {
      //console.log(req.url);
      res.render('_common/sitemap-pages', {isodate:isodate});

    } else if (req.params.taxonomy) {
      //console.log(req.params.taxonomy);
      helpers.getPostType(req, req.params.taxonomy, function( results ) {
        res.render('_common/sitemap-taxonomy', {results:results, isodate:isodate});
      });

    } else if (req.params.edition) {
        var result = config.meta.editions[req.params.edition];
        var now = new Date();
        var date = new Date(result["wpcf-startdate"]*1000);
        var timeDiff = (date.getTime() - now.getTime());
        var diffDays = (timeDiff / (1000 * 3600 * 24));
        var lastmod = diffDays < 0 ? fnz.ISODateString(date) : fnz.ISODateString(now);
        var changefreq = diffDays < 0 ? "yearly" : "daily";
        res.render('_common/sitemap-edition', {result:result, lastmod:lastmod, changefreq:changefreq});
    } else if (req.params.exhibition) {
      //console.log(req.params.exhibition);
        var result = config.meta.editions[req.params.exhibition];
        res.render('_common/sitemap-exhibition', {result:result, isodate:isodate});
      //});

    } else if (req.params.posttype) {
      //console.log("eccomi");
      //console.log(config.sez[req.params.posttype]);
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
        console.log("eccomi");
        //console.log("eccomi");
        res.render('_common/sitemap-users', {results: results, baseurl:config.sitemap.users[req.params.users].baseurl});
      });
    }
  });
};

exports.getAll = function getAll(req, res) {
  helpers.setSessions(req, function() {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAllAward(req, sez.limit, page, function( results ) {
        var page_data = fnz.setPageData(req, posttype);
        res.render(config.prefix+'/'+sez.puglist, {results: results, page_data:page_data, sessions:req.session.sessions, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
