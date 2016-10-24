var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });

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