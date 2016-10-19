var WPAPI = require( 'wpapi' );
var moment = require( 'moment' );

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
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/(?P<sluggg>)' );
  wp.myCustomResource().sluggg().get(function( err, data ) {
    console.log("//// Events");
    console.log(err || data);
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