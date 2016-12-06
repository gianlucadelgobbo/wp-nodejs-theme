var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });
var helpers = require('./../helpers');

exports.get = function get(req, res) {
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

exports.getAllCustomers = function getAllCustomers(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "customers", function( result ) {
			meta_data.meta.title = __("Customers") + " | " + meta_data.meta.name;
			res.render(config.prefix+'/'+'users', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAllPeople = function getAllPeople(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllUsers(req, "people", function( result ) {
			meta_data.meta.title = __("People") + " | " + meta_data.meta.name;
			console.log(result);
			res.render(config.prefix+'/'+'users', {data: result, meta_data:meta_data});
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