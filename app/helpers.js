var WPAPI = require( 'wpapi' );
var request = require( 'request' );
var moment = require( 'moment' );
var fnz = require('./functions');
var jsonfile = require('jsonfile');
var fs = require('fs');

/* POST TYPE */
exports.getPostType = function getWeb(req,posttype,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez[posttype].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_type/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(posttype).get(function( err, data ) {
    console.log("//// PostType "+posttype);
    //console.log(err || data);
    //data = fnz.fixResult(data);
    callback(data);
  });
};

/* USERS */

exports.getUser = function getUser(req, callback) {
  console.log("getUser");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/author/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.user).get(function( err, data ) {
    console.log("//// User");
    for(auth_content in data.data.auth_contents) {
      data.data.auth_contents[auth_content].posts = fnz.fixResults(data.data.auth_contents[auth_content].posts);
    }
    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};

exports.getAllUsers = function getAllUsers(req, type, callback) {
  console.log("getAllUsers");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.users.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/authors/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(type).get(function( err, data ) {
    console.log("//// Users "+type);
    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};
//////// PAGES

exports.getPage = function getPage(req,callback) {
  if (req.params.subpage) req.params.page = req.params.page+"/"+req.params.subpage;
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.pages.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/mypages/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.page).get(function( err, data ) {
    console.log("//// Page " + req.params.page);
    if (!err && data) {
      if (data) data = fnz.fixResult(data);
      if (data.posts){
        data.posts = fnz.fixResults(data.posts);
      }
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    } else {
      data = {};
    }
    //console.log(data.posts);
    callback(data);
  });
};

exports.getAll = function getAll(req, sez, limit, page, callback) {
  this.getAllReturn(req, sez, limit, page, [], callback);
};

exports.getAllReturn = function getAllReturn(req, sez, limit, page, p, callback) {
  var trgt = this;
  var previousdata = p;
  console.log("getAll "+sez.post_type);
  console.log("page "+page);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: sez.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/'+sez.post_type );
  var mylimit =  limit>0 ? limit : 50;

  if (sez.site_tax) {
    wp.myCustomResource().param('site', sez.site_tax ).param( 'parent', 0 ).perPage(mylimit).page(page).get(function( err, data ) {
      console.log("//// AllFilterTax "+sez.post_type+" "+sez.site_tax);
      console.log(err || data);
      data = fnz.fixResults(data);
      if (limit == -1) {
        for(var d in data) if (data[d].id) previousdata.push(data[d]);
        if (data._paging.totalPages>page) {
          trgt.getAllReturn(req, sez, limit, page+1, previousdata, callback);
        } else {
          callback(previousdata);
        }
      } else {
        callback(data);
      }

    });
  } else {
    wp.myCustomResource().param( 'parent', 0 )/*.param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax )*/.perPage(mylimit).page(page).get(function( err, data ) {
      console.log("//// All "+sez.post_type);
      console.log(err || data);
      data = fnz.fixResults(data);
      if (limit == -1) {
        for(var d in data) if (data[d].id) previousdata.push(data[d]);
        if (data._paging.totalPages>page) {
          trgt.getAllReturn(req, sez, limit, page+1, previousdata, callback);
        } else {
          callback(previousdata);
        }
      } else {
        callback(data);
      }
    });
  }
};




//////// EVENTS

exports.getEvent = function getEvent(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    console.log("//// Event");
    //console.log(data);
    data = fnz.fixResult(data);
    callback(data);
  });
};

/*
exports.getAllEvents = function getAllEvents(req, limit, page, callback) {
  console.log("getAllEvents");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events', {params: [ 'before', 'after', 'author', 'parent' ]});
  wp.myCustomResource().param('site', config.site_tax ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Events "+config.site_tax);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

exports.getAllEventsByYear = function getAllEventsByYear(req, years, callback) {
  console.log("getAllEventsByYear");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  if (years) {
    console.log('/all-events/'+config.sez.events.site_tax[0]+"/"+years);
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<siteee>)/(?P<yearsss>)');
    wp.myCustomResource().siteee(config.sez.events.site_tax[0]).yearsss(years).get(function( err, data ) {
      console.log("//// All Events by year "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<siteee>)', {params: [ 'before', 'after', 'author', 'parent', 'post' ]});
    wp.myCustomResource().siteee(config.sez.events.site_tax[0]).get(function( err, data ) {
      console.log("//// All Events ALL");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  }
};

exports.getAllEventsByTag = function getAllEventsByTag(req, limit, page, callback) {
  console.log("getAllEventsByTag "+req.params.tag);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events_tag/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.tag).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Events By Tag "+req.params.tag);
    console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


/*
exports.getAllEventsByYear = function getAllEventsByYear(req, year, limit, page, callback) {
  console.log("getAllEventsByYear");
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez.events.domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  //wp.myCustomResource().param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param('after', ((year-1)+'-12-31T00:00:00.000Z')).param('before', ((year+1)+'-01-01T00:00:00.000Z') ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
  wp.myCustomResource().param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// EventsByYear");
    console.log(new Date( (year-1)+'-12-31' ));
    console.log(new Date( (year+1)+'-01-01' ));
    //console.log(data.length);
    console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

//////// NEWS

exports.getNew = function getNew(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["news"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/news/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    console.log("//// New");
    data = fnz.fixResult(data);
    callback(data);
  });
};

//////// WEB & MOBILE

exports.getWeb = function getWeb(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["web-and-mobile"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/web-and-mobile/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.web).get(function( err, data ) {
    console.log("//// Web");
    data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllWebByTag = function getAllWebByTag(req, limit, page, callback) {
  console.log("getAllWebByTag "+req.params.tag);
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["web-and-mobile"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_tag/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.tag).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Web By Tag");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// LEARNING

exports.getLearning = function getLearning(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["learning"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/learning/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.learning).get(function( err, data ) {
    console.log("//// Learning");
    data = fnz.fixResult(data);
    callback(data);
  });
};

//////// VIDEOS

exports.getVideo = function getVideo(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["videos"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/videos/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.video).get(function( err, data ) {
    console.log("//// Video");
    data = fnz.fixResult(data);
    callback(data);
  });
};

//////// AWARDS

exports.getAward = function getAward(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["awards-and-grants"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/awards-and-grants/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.award). get(function( err, data ) {
    console.log("//// Award");
    data = fnz.fixResult(data);
    callback(data);
  });
};

//////// LAB

exports.getLab = function getLab(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  var wp = new WPAPI({ endpoint: config.sez["lab"].domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/lab/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.lab).get(function( err, data ) {
    console.log("//// Lab");
    data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    data = fnz.fixResult(data);
    callback(data);
  });
};


//////// EXHIBITIONS

exports.getExhibition = function getExhibition(req,callback) {
  console.log(req.params.exhibition);
  console.log(req.params.subexhibition);
  console.log(req.params.subsubexhibition);
  var wp = new WPAPI({ endpoint: config.sez.exhibitions.domain+'/wp-json' });
  if (req.params.subsubexhibition) {
    console.log("req.params.subsubexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)/(?P<subsubexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).subsubexhibition(req.params.subsubexhibition).get(function( err, data ) {
      console.log("//// SubSubExhibition");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else if (req.params.subexhibition) {
    console.log("req.params.subexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).get(function( err, data ) {
      console.log("//// SubExhibition ");
      //data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.exhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).get(function( err, data ) {
      console.log("//// Exhibition ");
      data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

/*
exports.getAllExhibitions = function getAllExhibitions(req, limit, page, callback) {
  console.log("getAllExhibitions");
  var wp = new WPAPI({ endpoint: config.sez.exhibitions.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions' );
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Exhibitions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

//////// EDITIONS
/*
exports.getAllEditions = function getAllEditions(req, limit, page, callback) {
  console.log("getAllEditions");
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions' );
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    console.log("//// All Editions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/
exports.getAllEditionsByYear = function getAllEditionsByYear(req, years, limit, page, callback) {
  console.log("getAllEditionsByYear");
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  if (years){
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-editions/(?P<yearsss>)' );
    wp.myCustomResource().yearsss(years).get(function( err, data ) {
      console.log("//// All EditionsByYear "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-editions' );
    //console.log(wp.myCustomResource);
    //console.log(wp.new());
    wp.myCustomResource().get(function( err, data ) {
      console.log("//// All EditionsByYear");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });

  }
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
    wp.myCustomResource().edition(req.params.edition).get(function( err, data ) {
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
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      console.log("//// Artist Performance");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      //console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").get(function( err, data ) {
      console.log("//// SubEdition Artists");
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
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      console.log("//// Artist gallery item");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      console.log("//// Artist gallery");
      //console.log(data);
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


exports.getArtistGallery = function getArtistGallery(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.sez.editions.domain+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallerypage/(?P<sluggg>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().sluggg(req.params.page).artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      console.log("//// Artist page gallery item");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallerypage/(?P<sluggg>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().sluggg("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      console.log("//// Artist page gallery");
      //console.log(data);
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

exports.getAllEditionsEvents = function getAllEditionsEvents(req, years, callback) {
  var trgt = this;
  var data = [];
  trgt.getAllEventsByYear(req, years, function (data_events) {
    for (var item in data_events) if (data_events[item]['wpcf-startdate']) data.push(data_events[item]);
    trgt.getAllEditionsByYear(req, years, 100, 1, function (data_editions) {
      for (var item in data_editions) if (data_editions[item]['wpcf-startdate']) data.push(data_editions[item]);
      data.sort(fnz.sortByStartDate);
      //for (var item in data) console.log(moment(data[item]['wpcf-startdate']*1000).utc().format("YYYY-MM-DD, h:mm a"));
      callback(data);
    });
  });
};

//////// GLOBAL

exports.getMetaData = function getMetaData(req,callback) {
  config.current_lang =  req.url.indexOf('/it/')===0 ? 'it' : 'en';
  global.setLocale(config.current_lang);
  var moment = require('moment');
  require('moment/locale/'+(config.current_lang=="en" ? "en-gb" : config.current_lang));
  if (config.last_edition) var edition = req.params.edition ? req.params.edition : config.last_edition;
  var file = config.root+'/tmp/'+config.prefix+'/meta_'+(edition ? edition+"_" : "")+config.current_lang+'.json';
  if (req.query.createcache==1 || !fs.existsSync(file)) {
    request(config.domain + (config.current_lang != config.default_lang ? '/' + config.current_lang : '') + '/wp-json/wp/v2/meta_data/'+(edition ? edition : ""), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        if (data.edition) data.edition = fnz.fixResult(data.edition);
        jsonfile.writeFile(file, data, function (err) {
          if (err) console.log(err);
        });
        data.url = req.url;
        data.langSwitcher = {
          "it": (req.url.indexOf('/it/') === 0 ? req.url : '/it' + req.url),
          "en": (req.url.indexOf('/it/') === 0 ? req.url.substring(3) : req.url)
        };
        callback(data);
      }
    });
  } else {
    var data = jsonfile.readFileSync(file);
    data.url = req.url;
    data.langSwitcher = {
      "it": (req.url.indexOf('/it/') === 0 ? req.url : '/it' + req.url),
      "en": (req.url.indexOf('/it/') === 0 ? req.url.substring(3) : req.url)
    };
    callback(data);
  }
};
