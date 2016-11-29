var WPAPI = require( 'wpapi' );
var moment = require( 'moment' );
var fnz = require('./functions');

//////// PAGES

exports.getPage = function getPage(req,callback) {
  console.log(req.params.page);
  var wp = new WPAPI({ endpoint: config.sez.pages.domain+'/wp-json' });
  //wp.myCustomResource = wp.registerRoute( 'wp/v2', '/events/(?P<sluggg>)' );
  wp.pages().slug(req.params.page).get(function( err, data ) {
    console.log("//// Page");
    data = fnz.fixResults(data);
    callback(data[0]);
  });
};


//////// EVENTS

exports.getEvent = function getEvent(req,callback) {
  console.log(req.params.event);
  var wp = new WPAPI({ endpoint: config.sez.events.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/events/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    console.log("//// Event");
    console.log(err);
    data = fnz.fixResult(data);
    callback(data);
  });
};
exports.getAllEvents = function getAllEvents(req, limit, page, callback) {
  console.log("getAllEvents");
  var wp = new WPAPI({ endpoint: config.sez.events.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/events' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  wp.myCustomResource().param( 'before', new Date( '2016-09-22' ) ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// Events");
    console.log(err);
    console.log(data.length);

    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};

exports.getAllEventsByYear = function getAllEventsByYear(req, year, limit, page, callback) {
  console.log("getAllEventsByYear");
  var wp = new WPAPI({ endpoint: config.sez.events.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/events' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  wp.myCustomResource().param('after', new Date((year-1)+'-12-31')).param('before', new Date((year+1)+'-01-01') ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// EventsByYear");
    console.log(new Date( (year-1)+'-12-31' ));
    console.log(new Date( (year+1)+'-01-01' ));
    //console.log(data.length);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// NEWS

exports.getNew = function getNew(req,callback) {
  console.log(req.params.new);
  var wp = new WPAPI({ endpoint: config.sez.news.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/new/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    console.log("//// New");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllNews = function getAllNews(req, limit, page, callback) {
  console.log("getAllNews");
  var wp = new WPAPI({ endpoint: config.sez.news.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/news' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// News");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// EDITIONS

exports.getAllEditions = function getAllEditions(req, limit, page, callback) {
  console.log("getAllEditions");
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition' );
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
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition' );
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
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  if (req.params.subsubedition) {
    console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      console.log("//// SubSubEdition");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else if (req.params.subedition) {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).get(function( err, data ) {
      console.log("//// SubEdition");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.edition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)' );
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
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
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
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      console.log("//// Artist gallery item");
      console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      console.log("//// Artist gallery");
      console.log(data);
      callback(data);
    });
  /*} else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });*/
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").get(function( err, data ) {
      console.log("//// SubEdition gallery");
      callback(data);
    });
  }
};

exports.getEditionData = function getEditionData(req,callback) {
  var edition = req.params.edition ? req.params.edition : config.last_edition;
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  console.log(edition);
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition_data/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(edition).get(function( err, data ) {
    data.edition = fnz.fixResult(data.edition);
    callback(data);
  });
};


//////// GLOBAL

exports.getAll = function getAll(req, limit, page, callback) {
  var trgt = this;
  trgt.getAllNews(req, limit, page, function (data_news) {
    var data = [];
    for (var item in data_news) if (data_news[item].title) data.push(data_news[item]);
    console.log(data.length);
    trgt.getAllEvents(req, limit, page, function (data_events) {
      for (var item in data_events) if (data_events[item].title) data.push(data_events[item]);
      console.log(data.length);
      trgt.getAllEditions(req, limit, page, function (data_editions) {
        for (var item in data_editions) if (data_editions[item].title) data.push(data_editions[item]);
        data = fnz.fixResults(data);
        data.sort(fnz.sortByStartDate);
        callback(data);
      });
    });
  });
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

/*
 exports.getEditionChilds = function getEditionChilds(edition, wp, callback) {
  console.log("getEditionChilds");
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition_parent/(?P<sluggg>)' );
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
      wp.myCustomResource = wp.registerRoute( 'wp/v2', '/author/(?P<author>)' );
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