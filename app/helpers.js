var WPAPI = require( 'wpapi' );
var moment = require( 'moment' );

exports.getPage = function getPage(req,callback) {
  console.log(req.params.page);
  var wp = new WPAPI({ endpoint: 'http://liveperformersmeeting.net/wp-json' });
  //wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<sluggg>)' );
  wp.pages().slug(req.params.page).get(function( err, data ) {
    console.log("//// Event");
    callback(data);
  });
};
exports.getEvent = function getEvent(req,callback) {
  console.log(req.params.event);
  var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    console.log("//// Event");
    data.startdateISO = moment(data['wpcf-startdate']*1000).utc().format();
    data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    data.enddateISO = moment(data['wpcf-enddate']*1000).utc().format();
    data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    callback(data);
  });
};
exports.getAllEvents = function getEvent(req,callback) {
  console.log("getAllEvents");
  var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  wp.myCustomResource().param( 'parent', 0 ).perPage( 20 ).page(5).get(function( err, data ) {
    console.log("//// Events");
    console.log(err || data);
    callback(data);
  });
};

exports.getNew = function getNew(req,callback) {
  console.log(req.params.new);
  var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/new/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    console.log("//// New");
    data.startdateISO = moment(data['wpcf-startdate']*1000).utc().format();
    data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    data.enddateISO = moment(data['wpcf-enddate']*1000).utc().format();
    data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    callback(data);
  });
};
exports.getAllNews = function getNew(req,callback) {
  console.log("getAllNews");
  var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/new' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage( 20 ).page(5).get(function( err, data ) {
    console.log("//// News");
    console.log(err || data);
    callback(data);
  });
};

exports.getEdition = function getEdition(req,callback) {
  console.log(req.params.edition);
  var wp = new WPAPI({ endpoint: 'http://liveperformersmeeting.net/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.edition).get(function( err, data ) {
    console.log("//// Edition");
    data.startdateISO = moment(data['wpcf-startdate']*1000).utc().format();
    data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    data.enddateISO = moment(data['wpcf-enddate']*1000).utc().format();
    data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    callback(data);
  });
};
exports.getEditionData = function getEditionData(req,callback) {
  var edition = req.params.edition ? req.params.edition : "2016-amsterdam";
  var wp = new WPAPI({ endpoint: 'http://liveperformersmeeting.net/wp-json' });
  console.log(edition);
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition_data/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(edition).get(function( err, data ) {
    console.log(err || data);
    //data[data2.ID] = data2;
    data.edition.startdateISO = moment(data.edition['wpcf-startdate']*1000).utc().format();
    data.edition.startdateHR = moment(data.edition['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    data.edition.enddateISO = moment(data.edition['wpcf-enddate']*1000).utc().format();
    data.edition.enddateHR = moment(data.edition['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
    callback(data);
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
    DB.accounts.findOne(q ,function(err, result) {
      if (result) {
        e.push({name:"vat_number",m:__("VAT number already in use")});
        callback(e, o);
      } else {
        if (global._config.company.country == "Italy" && o.address.country == "Italy"){
          //var q = (o.id ? {_id:{$ne: new ObjectID(o.id)},fiscal_code:o.fiscal_code} : {fiscal_code:o.fiscal_code});
          DB.accounts.findOne({user:o.user}, function(err, result) {
            if (result){
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