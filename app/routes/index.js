var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });

exports.get = function get(req, res) {
	wp.pages().get(function( err, data ) {
		//console.log(err || data);

		if ( err ) {

			// handle err
		}
		// do something with the returned posts
		res.render('index', {
			data: data
		});
	});
};