var WPAPI = require( 'wpapi' );
var moment = require( 'moment' );

//////// PAGES
exports.getPage = function getPage(req,callback) {
  console.log(req.params.page);
  var wp = new WPAPI({ endpoint: config.domains.pages+'/wp-json' });
  //wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<sluggg>)' );
  wp.pages().slug(req.params.page).get(function( err, data ) {
    console.log("//// Page");
    data[0].date = moment(data[0].date).utc().format();
    data[0].dateHR = moment(data[0].date).utc().format("MMMM, Do YYYY, h:mm a");
    callback(data[0]);
  });
};
exports.getEvent = function getEvent(req,callback) {
  console.log(req.params.event);
  var wp = new WPAPI({ endpoint: config.domains.events+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.domains.events+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.domains.news+'/wp-json' });
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
  var wp = new WPAPI({ endpoint: config.domains.news+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/new' );
  //console.log(wp.myCustomResource);
  //console.log(wp.new());
  wp.myCustomResource().param( 'parent', 0 ).perPage( 20 ).page(5).get(function( err, data ) {
    console.log("//// News");
    console.log(err || data);
    callback(data);
  });
};

exports.getGrid = function getGrid(data) {
  var row=0;
  var col=0;
  var grid = [];
  var rowsN = parseInt(data['wpcf-rows']);
  var columnsN = parseInt(data['wpcf-columns']);
  //if (rowsN>0 && columnsN>0) {
  //}
  if (data['wpcf-same-rows-height']==1) {
    while (row<rowsN) {
      grid[row] = [];
      while (col<columnsN) {
        grid[row][col] = {};
        grid[row][col].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
        grid[row][col].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
        grid[row][col].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
        col++;
      }
      col=0;
      row++;
    }
  } else {
    while (col<columnsN) {
      grid[col] = [];
      while (row<rowsN) {
        grid[col][row] = {};
        grid[col][row].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
        grid[col][row].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
        grid[col][row].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
        row++;
      }
      row=0;
      col++;
    }
  }
  return grid;
};

exports.getEdition = function getEdition(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.domains.editions+'/wp-json' });
  if (req.params.subsubedition) {
    console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      console.log("//// SubSubEdition");
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = getGrid(data);
      callback(data);
    });
  } else if (req.params.subedition) {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition(req.params.subedition).get(function( err, data ) {
      console.log("//// SubEdition");
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = getGrid(data);
      callback(data);
    });
  } else {
    console.log("req.params.edition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)' );
    console.log(wp.myCustomResource);
    wp.myCustomResource().edition(req.params.edition,req.params.subsubedition,req.params.subsubedition).get(function( err, data ) {
      console.log("//// Edition");
      data.startdateISO = moment(data['wpcf-startdate']*1000).utc().format();
      data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
      data.enddateISO = moment(data['wpcf-enddate']*1000).utc().format();
      data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = getGrid(data);
      callback(data);
    });
  }
  function getGrid(data){
    console.log(typeof this.getGrid);
    //return this.getGrid(data);
    var row=0;
    var col=0;
    var grid = [];
    var rowsN = parseInt(data['wpcf-rows']);
    var columnsN = parseInt(data['wpcf-columns']);
    //if (rowsN>0 && columnsN>0) {
    //}
    if (data['wpcf-same-rows-height']==1) {
      while (row<rowsN) {
        grid[row] = [];
        while (col<columnsN) {
          grid[row][col] = {};
          grid[row][col].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
          grid[row][col].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
          grid[row][col].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
          col++;
        }
        col=0;
        row++;
      }
    } else {
      while (col<columnsN) {
        grid[col] = [];
        while (row<rowsN) {
          grid[col][row] = {};
          grid[col][row].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
          grid[col][row].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
          grid[col][row].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
          row++;
        }
        row=0;
        col++;
      }
    }
    return grid;
  }

};
exports.getEditionArtist = function getEditionArtist(req,callback) {
  console.log(req.params.edition);
  console.log(req.params.subedition);
  console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.domains.editions+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)/(?P<subedition>)/(?P<artist>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").artist(req.params.artist).get(function( err, data ) {
      console.log("//// Artist");
      console.log(data);
      callback(data);
    });
  } else {
    console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/edition/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(req.params.edition).subedition("artists").get(function( err, data ) {
      console.log("//// SubEdition");
      callback(data);
    });
  }
};

exports.getEditionData = function getEditionData(req,callback) {
  var edition = req.params.edition ? req.params.edition : "2016-amsterdam";
  var wp = new WPAPI({ endpoint: config.domains.editions+'/wp-json' });
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