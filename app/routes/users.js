var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getUser(req, function( result ) {
			meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
			res.render(config.prefix+'/'+'user', {data: result, meta_data:meta_data, itemprop:req.url.indexOf("/people/")>=0 ? "employee" : "sponsor"});
		});
	});
};

exports.getAllCustomers = function getAllCustomers(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "customers", function( result ) {
			meta_data.meta.title = __("Customers") + " | " + meta_data.meta.name;
			res.render(config.prefix+'/'+'users', {data: result, meta_data:meta_data,author_base:'customers', title: __("Customers"), itemprop:"sponsor"});
		});
	});
};

exports.getAllPeople = function getAllPeople(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "people", function( result ) {
			meta_data.meta.title = __("People") + " | " + meta_data.meta.name;
			res.render(config.prefix+'/'+'users', {data: result, meta_data:meta_data,author_base:'people', title: __("People"), itemprop:"employee"});
		});
	});
};

exports.getAll = function get(req, res) {
	console.log(req.param("user"));
	wp.users().slug(req.param("user")).get(function( err, data ) {
		console.log(err || data);

		if ( err ) {

			// handle err
		}
		// do something with the returned posts
		res.render(config.prefix+'/'+'users', {
			data: data
		});
	});
};