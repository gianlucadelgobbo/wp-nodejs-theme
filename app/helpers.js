var WPAPI = require( 'wpapi' );
var request = require( 'request' );
var moment = require( 'moment' );
var fnz = require('./functions');

exports.getUser = function getUser(req, callback) {
  console.log("getUser");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  /*wp.users().slug(req.param("user")).get(function( err, data ) {
    console.log(err || data);
  });*/
  wp.myCustomResource = wp.registerRoute('wp/v2', '/author/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.user).get(function( err, data ) {
    console.log("//// User");
    for(auth_content in data.data.auth_contents) {
      //console.log(data.data.auth_contents[auth_content].posts);
      data.data.auth_contents[auth_content].posts = fnz.fixResults(data.data.auth_contents[auth_content].posts);
    }
    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};

exports.getAllUsers = function getAllEvents(req, type, callback) {
  console.log("getAllUsers");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/authors/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(type).get(function( err, data ) {

    console.log("//// Users"+type);

    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};
//////// PAGES

exports.getPage = function getPage(req,callback) {
  console.log(req.params.page);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.pages.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/mypages/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.page).get(function( err, data ) {
    console.log("//// Page");
    //console.log(err);
    data = fnz.fixResult(data);
    if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    callback(data);
  });
};


//////// EVENTS

exports.getEvent = function getEvent(req,callback) {
  console.log(req.params.event);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    console.log("//// Event");
    //console.log(data);
    data = fnz.fixResult(data);
    //console.log(data);
    callback(data);
  });
};
exports.getAllEvents = function getAllEvents(req, limit, page, callback) {
  console.log("getAllEvents");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events');
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  wp.myCustomResource()/*.param( 'before', new Date( '2016-09-22' ) )*/.param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// Events");
    //console.log(err);
    //console.log(data.length);

    //console.log(err || data._paging);
    data = fnz.fixResults(data);
    callback(data);
  });
};

exports.getAllEventsByYear = function getAllEventsByYear(req, year, limit, page, callback) {
  console.log("getAllEventsByYear");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  wp.myCustomResource().param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param('after', new Date((year-1)+'-12-31')).param('before', new Date((year+1)+'-01-01') ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// EventsByYear");
    //console.log(new Date( (year-1)+'-12-31' ));
    //console.log(new Date( (year+1)+'-01-01' ));
    //console.log(data.length);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// NEWS

exports.getNew = function getNew(req,callback) {
  console.log(req.params.new);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/news/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    console.log("//// New");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllNews = function getAllNews(req, limit, page, callback) {
  console.log("getAllNews");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/news' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 )/*.param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax )*/.perPage(limit).page(page).get(function( err, data ) {
    console.log("//// News");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// WEB & MOBILE

exports.getWeb = function getWeb(req,callback) {
  console.log(req.params.web);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.web.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/web-and-mobile/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.web).get(function( err, data ) {
    console.log("//// Web");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getPostType = function getWeb(req,posttype,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.web.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_type/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(posttype).get(function( err, data ) {
    console.log("//// posttype"+posttype);
    //data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllWeb = function getAllWeb(req, limit, page, callback) {
  console.log("getAllWeb");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/web-and-mobile' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Web");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// LEARNING

exports.getLearning = function getLearning(req,callback) {
  console.log(req.params.learning);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/learning/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.learning).get(function( err, data ) {
    console.log("//// learning");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllLearning = function getAllLearning(req, limit, page, callback) {
  console.log("getAllWeb");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/learning' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All learning");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// VIDEOS

exports.getVideo = function getVideo(req,callback) {
  console.log(req.params.video);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/videos/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.video).get(function( err, data ) {
    console.log("//// Video");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllVideo = function getAllVideo(req, limit, page, callback) {
  console.log("getAllVideo");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/videos' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Video");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// AWARDS

exports.getAward = function getAward(req,callback) {
  console.log(req.params.award);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/awards-and-grants/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.award). get(function( err, data ) {
    console.log("//// Award");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllAward = function getAllAward(req, limit, page, callback) {
  console.log("getAllAward");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/awards-and-grants' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Award");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};

//////// LAB

exports.getLab = function getLab(req,callback) {
  console.log(req.params.lab);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/lab/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.lab).get(function( err, data ) {
    console.log("//// lab");
    data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllLab = function getAllLab(req, limit, page, callback) {
  console.log("getAllLab");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.news.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/lab' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All lab");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};



//////// GLOBAL

exports.getMetaData = function getMetaData(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  global.setLocale(config.current_lang);
  request(config.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2/meta_data/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      data.url = req.url;
      data.langSwitcher = {
        "it" : (req.url.indexOf('/it/')===0 ? req.url : '/it'+req.url),
        "en" : (req.url.indexOf('/it/')===0 ? req.url.substring(3) : req.url)
      }
      callback(data);
    }
  });
};

/*exports.getAll = function getAll(req, limit, page, callback) {
  var trgt = this;
  trgt.getAllNews(req, limit, page, function (data_news) {
    var data = [];
    for (var item in data_news) if (data_news[item].title) data.push(data_news[item]);
    console.log(data.length);
    trgt.getAllEvents(req, limit, page, function (data_events) {
      for (var item in data_events) if (data_events[item].title) data.push(data_events[item]);
      trgt.getAllEditions(req, limit, page, function (data_editions) {
        for (var item in data_editions) if (data_editions[item].title) data.push(data_editions[item]);
        data = fnz.fixResults(data);
        data.sort(fnz.sortByStartDate);
        callback(data);
      });
    });
  });
};


//////// EDITIONS

exports.getAllEditions = function getAllEditions(req, limit, page, callback) {
  console.log("getAllEditions");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/edition' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Editions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
exports.getAllEditionsByYear = function getAllEditionsByYear(req, year, limit, page, callback) {
  console.log("getAllEditions");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/edition' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'after', new Date( (year-1)+'-12-31' ) ).param( 'before', new Date( (year+1)+'-01-01' ) ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Editions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


exports.getEdition = function getEdition(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  if (req.params.subsubedition) {
    console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      console.log("//// SubSubEdition");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else if (req.params.subedition) {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).get(function( err, data ) {
      console.log("//// SubEdition");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.edition");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)' );
    console.log(wp.myCustomResource);
    wp.myCustomResource().edition(req.params.edition,req.params.subsubedition,req.params.subsubedition).get(function( err, data ) {
      console.log("//// Edition");
      data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getEditionArtist = function getEditionArtist(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").get(function( err, data ) {
      console.log("//// SubEdition");
      callback(data);
    });
  }
};

exports.getEditionArtistGallery = function getEditionArtistGallery(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      console.log("//// Artist gallery item");
      console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      console.log("//// Artist gallery");
      console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute('wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").get(function( err, data ) {
      console.log("//// SubEdition gallery");
      callback(data);
    });
  }
};

exports.getAllEditionsEvents = function getAllEditionsEvents(req, year, callback) {
  var trgt = this;
  var data = [];
  trgt.getAllEventsByYear(req, year, 100, 1, function (data_events) {
    //console.log(data_events);
    for (var item in data_events) if (data_events[item]['wpcf-startdate']) data.push(data_events[item]);
    console.log(data.length);
    trgt.getAllEditionsByYear(req, year, 100, 1, function (data_editions) {
      for (var item in data_editions) if (data_editions[item]['wpcf-startdate']) data.push(data_editions[item]);
      data.sort(fnz.sortByStartDate);
      for (var item in data) console.log(moment(data[item]['wpcf-startdate']*1000).utc().format("YYYY-MM-DD, h:mm a"));
      callback(data);
    });
  });
};

 exports.getEditionChilds = function getEditionChilds(edition, wp, callback) {
  console.log("getEditionChilds");
  wp.myCustomResource = wp.registerRoute('wp/v2', '/edition_parent/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(edition).get(function( err, data ) {
    //console.log(data);
    data[data2.ID] = data2;
    callback(data);
  });
};
   wp.myCustomResource().id(data[0].capauthor[0]).get(function( err2, data2 ) {
      console.log("//// capauthor");
      console.log(err2 || data2);
      console.log(data2.name);
      wp.myCustomResource = wp.registerRoute('wp/v2', '/author/(?P<author>)' );
      wp.myCustomResource().author(data2.name).get(function( err3, data3 ) {
        console.log("//// author");
        console.log(err3 || data3);
        res.render('events', {
          data: data
        });
      });
    });
    // do something with the returned posts

  });
    DB.accounts.findOne(q ,function(err, data) {
      if (data) {
        e.push({name:"vat_number",m:__("VAT number already in use")});
        callback(e, o);
      } else {
        if (global._config.company.country == "Italy" && o.address.country == "Italy"){
          //var q = (o.id ? {_id:{$ne: new ObjectID(o.id)},fiscal_code:o.fiscal_code} : {fiscal_code:o.fiscal_code});
          DB.accounts.findOne({user:o.user}, function(err, data) {
            if (data){
              e.push({name:"fiscal_code",m:__("Fiscal code already in use")});
            }
            callback(e, o);
          });
        } else {
          callback(e, o);
        }
      }
    });
  }
};
  */