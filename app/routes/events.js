var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });

exports.get = function get(req, res) {
	console.log(req.param("event"));
	wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<slug>)' );
	wp.myCustomResource().slug(req.param("event")).get(function( err, data ) {
		console.log(data[0].author[0]);
		wp.users().id(data[0].author[0]).get(function( err2, data2 ) {
			console.log(err2 || data2);
			res.render('events', {
				data: data
			});
		});
		// do something with the returned posts

	});
};