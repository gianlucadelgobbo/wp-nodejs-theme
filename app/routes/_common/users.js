var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
var helpers = require('../../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getUser(req, function( result ) {
			meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
			var pugPage = result.
			res.render(config.prefix+'/'+'user_'+(req.url.indexOf("/people/")>=0 ? "people" : "customer"), {result: result, meta_data:meta_data, itemprop:req.url.indexOf("/people/")>=0 ? "employee" : "sponsor"});
		});
	});
};

exports.getAllCustomers = function getAllCustomers(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "customers", function( results ) {
			meta_data.meta.title = __("Customers") + " | " + meta_data.meta.name;
			res.render(config.prefix+'/'+'users_customer', {results: results, meta_data:meta_data,author_base:'customers', title: __("Customers"), itemprop:"sponsor"});
		});
	});
};

exports.getAllPeople = function getAllPeople(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "people", function( results ) {
			meta_data.meta.title = __("People") + " | " + meta_data.meta.name;
			res.render(config.prefix+'/'+'users_people', {results: results, meta_data:meta_data,author_base:'people', title: __("People"), itemprop:"employee"});
		});
	});
};
