var WPAPI = require( 'wpapi' );
var request = require( 'request' );
var moment = require( 'moment' );
var fnz = require('./functions');
var jsonfile = require('jsonfile');
var fs = require('fs');
var Validators = require('./validators').Validators;

exports.validateFormEmail = function validateFormEmail(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Please enter a valid Name")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if (!Validators.validateStringLength(o.message, 3, 100)){
    e.push({name:"name",m:__("Please enter a valid Message")});
  }
  callback(e, o);
};

exports.validateFormNewsletter = function validateFormNewsletter(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Please enter a valid name")});
  }
  if (!Validators.validateStringLength(o.surname, 3, 100)){
    e.push({name:"surname",m:__("Please enter a valid surname")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if(!Validators.validateStringLength(o.country, 3, 100)){
    e.push({name:"country",m:__("Please select your country")});
  }
  if(!o.topics.length){
    e.push({name:"topics",m:__("Please select at least one topic")});
  }
  callback(e, o);
};

exports.validateFormJoin = function validateFormJoin(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.organization_name, 3, 100)){
    e.push({name:"organization_name",m:__("Organization name is required")});
  }
  if(!Validators.validateStringLength(o.organization_country, 3, 100)){
    e.push({name:"organization_country",m:__("Please select your Organization country")});
  }
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Your name is required")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if (!Validators.validateStringLength(o.activity_description, 3, 100)){
    e.push({name:"activity_description",m:__("Organization activity description is required")});
  }
  if (!Validators.validateStringLength(o.activity_list, 3, 100)){
    e.push({name:"activity_list",m:__("Activities name list is required")});
  }
  callback(e, o);
};


/* POST TYPE */
exports.getPostType = function getPostType(req,posttype,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_type/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(posttype).get(function( err, data ) {
    console.log("//// PostType "+posttype);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getContainerPage = function getContainerPage(req,slug,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  console.log(config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2/container_pages/'+config.prefix+'/'+ slug);
  wp.myCustomResource = wp.registerRoute('wp/v2', '/container_pages/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(config.prefix+'/'+ slug).get(function( err, data ) {
    console.log("//// ContainerPage "+slug);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

/* USERS */

exports.getUser = function getUser(req, user_sez, callback) {
  console.log("getUser"+config.data_domain);
  config.current_lang =  fnz.getCurrentLang(req);
  var wpflyer = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wpflyer.myCustomResource = wpflyer.registerRoute('wp/v2', '/author/(?P<siteee>)/(?P<sluggg>)' );
  wpflyer.myCustomResource().sluggg(req.params.user).siteee(config.site_tax).get(function( err, data ) {
    console.log(config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2/author/'+config.site_tax+'/'+req.params.user+'/');
    //
    if (err) {
      callback({});
    } else {
      console.log("//// User "+req.params.user+" "+config.site_tax);
      for(auth_content in data.data.auth_contents) {
        data.data.auth_contents[auth_content].posts = fnz.fixResults(data.data.auth_contents[auth_content].posts);
      }
      //console.log(err || data);
      //data = fnz.fixResults(data);
      if (!data.data.img || data.data.img=="") data.data.img = config.domain + config.sez.users[user_sez].default_img;
      callback(data);
    }
  });
};

exports.getAllUsers = function getAllUsers(req, user_sez, callback) {
  console.log("getAllUsers "+user_sez);
  config.current_lang =  fnz.getCurrentLang(req);
  console.log(config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2/authors/'+config.prefix+'/'+config.site_tax+'/'+user_sez+'/');
  var wpflyer = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wpflyer.myCustomResource = wpflyer.registerRoute('wp/v2', '/authors/(?P<site>)/(?P<sitetax>)/(?P<usersez>)' );
  console.log("stoqui "+user_sez);
  wpflyer.myCustomResource().site(config.prefix).sitetax(config.site_tax).usersez(user_sez).get(function( err, data ) {
    /*
    console.log(err || data);
    console.log("stoqui"+user_sez);
    console.log("//// Users "+user_sez);
    console.log("//// Mode ONLY ");
     */
    for (var user in data) if (!data[user].data.img || data[user].data.img=="") data[user].data.img = config.domain + config.sez.users[user_sez].default_img;
    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};
//////// PAGES

exports.getPage = function getPage(req,callback) {
  if (req.params.subpage) req.params.page = req.params.page+"/"+req.params.subpage;
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/mypages/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(config.prefix+'/'+req.params.page).get(function( err, data ) {
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
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/'+sez.post_type );
  var mylimit =  limit>0 ? limit : 50;

  if (sez.site_tax) {
    wp.myCustomResource().param('site', config.site_tax_id ).param( 'parent', 0 ).perPage(mylimit).page(page).get(function( err, data ) {
      console.log(config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type+"?site="+config.site_tax_id);
      console.log("//// AllFilterTax "+sez.post_type+" "+config.site_tax_id);
      //console.log(err || data);
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
    wp.myCustomResource().param( 'parent', 0 )/*.param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax_id )*/.perPage(mylimit).page(page).get(function( err, data ) {
      console.log("//// All "+config.data_domain);
      console.log(config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type);
      console.log("//// All "+sez.post_type);
      //console.log(err || data);
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
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    console.log("//// Eventoooo");
    console.log(data);
    if (data && data.ID) data = fnz.fixResult(data);
    console.log("//// Event");
    callback(data);
  });
};

/*
exports.getAllEvents = function getAllEvents(req, limit, page, callback) {
  console.log("getAllEvents");
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
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
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  if (years) {
    console.log('/all-events/'+config.site_tax_id+"/"+years);
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<site>)/(?P<years>)');
    wp.myCustomResource().site(config.site_tax_id).years(years).get(function( err, data ) {
      console.log("//// All Events by year "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<siteee>)', {params: [ 'before', 'after', 'author', 'parent', 'post' ]});
    wp.myCustomResource().siteee(config.site_tax_id).get(function( err, data ) {
      console.log("//// All Events ALL");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  }
};

exports.getAllEventsByTag = function getAllEventsByTag(req, limit, page, callback) {
  console.log("getAllEventsByTag "+req.params.tag);
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
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
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
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
  console.log("getNew"+req.params.new);
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/news/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    console.log("//// New");
    if (data && data.ID) if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// WEB & MOBILE

exports.getWeb = function getWeb(req,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/web-and-mobile/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.web).get(function( err, data ) {
    console.log("//// Web "+config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json/wp/v2/web-and-mobile/'+req.params.web);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllWebByTag = function getAllWebByTag(req, limit, page, callback) {
  console.log("getAllWebByTag "+req.params.tag);
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
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
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/learning/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.learning).get(function( err, data ) {
    console.log("//// Learning");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// VIDEOS

exports.getVideo = function getVideo(req,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/videos/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.video).get(function( err, data ) {
    console.log("//// Video");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// AWARDS

exports.getAward = function getAward(req,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/awards-and-grants/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.award). get(function( err, data ) {
    console.log("//// Award");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// LAB

exports.getLab = function getLab(req,callback) {
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/lab/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.lab).get(function( err, data ) {
    console.log("//// Lab");
    data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// ACTIVITY

exports.getActivity = function getActivity(req,callback) {
  console.log("//// getActivity");
  config.current_lang =  fnz.getCurrentLang(req);
  var wp = new WPAPI({ endpoint: config.data_domain+(config.current_lang!=config.default_lang ? '/'+config.current_lang : '')+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/activities/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.activity).get(function( err, data ) {
    console.log("//// Activities");
    //data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};


//////// EXHIBITIONS

exports.getExhibition = function getExhibition(req,callback) {
  console.log(req.params.exhibition);
  console.log(req.params.subexhibition);
  console.log(req.params.subsubexhibition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (req.params.subsubexhibition) {
    console.log("req.params.subsubexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)/(?P<subsubexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).subsubexhibition(req.params.subsubexhibition).get(function( err, data ) {
      console.log("//// SubSubExhibition");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else if (req.params.subexhibition) {
    console.log("req.params.subexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).get(function( err, data ) {
      console.log("//// SubExhibition ");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.exhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).get(function( err, data ) {
      console.log("//// Exhibition ");
      if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getExhibitionArtist = function getExhibitionArtist(req,callback) {
  console.log(req.params.exhibition);
  console.log(req.params.subexhibition);
  console.log(req.params.subsubexhibition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibition_artists/(?P<exhibition>)/(?P<subexhibition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      console.log("//// Artist Performance");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibition_artists/(?P<exhibition>)/(?P<subexhibition>)/(?P<artist>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      //console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").get(function( err, data ) {
      console.log("//// SubExhibition Artists");
      callback(data);
    });
  }
};

/*
exports.getAllExhibitions = function getAllExhibitions(req, limit, page, callback) {
  console.log("getAllExhibitions");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (req.params.subsubedition) {
    console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      console.log("//// SubSubEdition");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else if (req.params.subedition) {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).get(function( err, data ) {
      console.log("//// SubEdition");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.edition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)' );
    wp.myCustomResource().edition(req.params.edition).get(function( err, data ) {
      console.log("//// Edition");
      if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getEditionArtist = function getEditionArtist(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
    console.log(config.data_domain+'/wp-json/wp/v2/artists/?edition='+req.params.edition+"&subedition=artists&artist="+req.params.artist);
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      console.log(wp.myCustomResource);
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
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
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
  var data;
  config.current_lang =  fnz.getCurrentLang(req);
  global.setLocale(config.current_lang);
  var moment = require('moment');
  require('moment/locale/'+(config.current_lang=="en" ? "en-gb" : config.current_lang));
  data = config.meta;
  if (config.last_edition) {
    config.current_edition = req.params.edition ? req.params.edition : config.last_edition;
    if (!data.editions[config.current_edition].startdateISO) data.editions[config.current_edition] = fnz.fixResult(data.editions[config.current_edition]);
    console.log(data.editions[config.current_edition]);
    //data.description = data.editions[config.current_edition].description;
    //data.headline = data.editions[config.current_edition].headline;

    //var posttype = "editions";
    //var file = config.root+'/tmp/'+config.prefix+'/meta_'+edition+"_"+config.current_lang+'.json';
    //data = config.meta[edition];
  /*} else if (req.params.exhibition) {
    var edition = req.params.exhibition;
    //var posttype = "exhibitions";
    //var file = config.root+'/tmp/'+config.prefix+'/meta_'+edition+"_"+config.current_lang+'.json';
    data = config.meta[edition];*/
  } else {
    //var file = config.root+'/tmp/'+config.prefix+'/meta_'+config.current_lang+'.json';
  }
  /*if (req.query.createcache==1 || !fs.existsSync(file)) {
    request(config.data_domain + (config.current_lang != config.default_lang ? '/' + config.current_lang : '') + '/wp-json/wp/v2/meta_data/'+(edition ? posttype+"/"+edition : ""), function (error, response, body) {
      console.log(config.data_domain + (config.current_lang != config.default_lang ? '/' + config.current_lang : '') + '/wp-json/wp/v2/meta_data/'+(edition ? posttype+"/"+edition : ""));
      //console.log(error);
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
    var data = jsonfile.readFileSync(file);*/
    data.url = req.url;
    data.langSwitcher = {
      "it": (req.url.indexOf('/it/') === 0 ? req.url : '/it' + req.url),
      "en": (req.url.indexOf('/it/') === 0 ? req.url.substring(3) : req.url)
    };
    callback(data);
  //}
};
