var helpers = require('../../helpers');

exports.get = function get(req, res) {
  var user_sez = req.url.indexOf('/it/')===0 ? req.url.split("/")[2] : req.url.split("/")[1];
  console.log("user_sez "+user_sez);
  helpers.getMetaData(req, function( meta_data ) {
      helpers.getUser(req, user_sez, function( result ) {
        meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
        var pugPage = config.prefix+'/'+'user_'+user_sez;
        res.render(pugPage, {result: result, meta_data:meta_data, itemprop:config.sez.users[user_sez].itemprop});
      });
  });
};
/*
exports.getAllCustomers = function getAllCustomers(req, res) {
  console.log();
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getAllUsers(req, "customers", function( results ) {
      meta_data.meta.title = __(config.sez.users.customers.title) + " | " + meta_data.meta.name;
      res.render(config.prefix+'/'+'users_customer', {results: results, meta_data:meta_data,author_base:config.sez.users.customers.baseurl, title: __(config.sez.users.customers.title), itemprop:"sponsor"});
    });
  });
};

exports.getAllPeople = function getAllPeople(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getAllUsers(req, "people", function( results ) {
      meta_data.meta.title = __(config.sez.users.people.title) + " | " + meta_data.meta.name;
      res.render(config.prefix+'/'+'users_people', {results: results, meta_data:meta_data,author_base:config.sez.users.people.baseurl, title: __(config.sez.users.people.title), itemprop:"employee"});
    });
  });
};
*/
exports.getUsers = function getUsers(req, res) {
  var user_sez = req.url.split("/")[1];
  console.log("user_sez "+user_sez);
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getContainerPage(req, user_sez, function( posttype ) {
      helpers.getAllUsers(req, user_sez, function( results ) {
        meta_data.meta.title = __(config.sez.users[user_sez].title) + " | " + meta_data.meta.name;
        res.render(config.prefix+'/'+'users_'+user_sez, {results: results, meta_data:meta_data, posttype:posttype, author_base:config.sez.users[user_sez].baseurl, title: __(config.sez.users[user_sez].title)/*, itemprop:"sponsor"*/});
      });
    });
  });
};


