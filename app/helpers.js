var WPAPI = require( 'wpapi' );

exports.getEvent = function getEvent(req,callback) {
  console.log(req.params.event);
  var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<slug>)' );
  wp.myCustomResource().slug(req.params.event).get(function( err, data ) {
    console.log("//// Event");
    console.log(data[0].capauthor[0]);
    wp.myCustomResource = wp.registerRoute('wp/v2', '/capauthor/(?P<id>)');
    var capauthors = [];
    for (var a = 0; a < data[0].capauthor.length; a++) {
      wp.myCustomResource().id(data[0].capauthor[a]).get(function( err2, data2 ) {
        console.log("//// capauthor");
        //console.log(err2 || data2);
        console.log(data2.name);
        wp.myCustomResource = wp.registerRoute( 'wp/v2', '/author/(?P<author>)' );
        wp.myCustomResource().author(data2.name).get(function( err3, data3 ) {
          console.log("//// author");
          //console.log(err2 || data2);
          console.log(data3.data.display_name);
          capauthors.push(data3.data);
          console.log(data[0].capauthor.length);
          console.log(capauthors.length);
          if (data[0].capauthor.length==capauthors.length){
            data[0].authors = capauthors;
            callback(data[0]);
          }
        });
      });
    }
  });
};
exports.getEditionMenu = function getEditionMenu(req,callback) {
  var edition = req.params.edition ? req.params.edition : "2016-amsterdam";
  console.log(edition);
  var wp = new WPAPI({ endpoint: 'http://liveperformersmeeting.net/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)' );
  wp.myCustomResource().edition(edition).get(function( err, data2 ) {
    console.log(data2.ID);
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition_parent/(?P<id>)' );
    wp.myCustomResource().id(data2.ID).get(function( err, data ) {
      //console.log(err || data);
      //data[data2.ID] = data2;
      //console.log(data);
      callback(data);
    });
  });
};
exports.getEditionChilds = function getEditionChilds(edition, wp, callback) {
  console.log("getEditionChilds");
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition_parent/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(edition).get(function( err, data ) {
    //console.log(data);
    data[data2.ID] = data2;
    callback(data);
  });
};

/*
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