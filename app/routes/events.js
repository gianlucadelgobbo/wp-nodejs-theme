var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://flyer.it/wp-json' });

exports.get = function get(req, res) {
	console.log(req.params.event);
	wp.myCustomResource = wp.registerRoute( 'wp/v2', '/event/(?P<slug>)' );
	wp.myCustomResource().slug(req.params.event).get(function( err, data ) {
		console.log(data[0].author[0]);
		wp.myCustomResource = wp.registerRoute( 'wp/v2', '/author/(?P<id>)' );
		wp.myCustomResource().id(data[0].author[0]).get(function( err2, data2 ) {
			console.log(err2 || data2);
			console.log(data2.name);
			wp.myCustomResource = wp.registerRoute( 'myplugin/v1', '/author/(?P<slug>)' );
			wp.myCustomResource().slug(data2.name).get(function( err3, data3 ) {
				console.log(err3 || data3);
				res.render('events', {
					data: data
				});
			});
		});
		// do something with the returned posts

	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
