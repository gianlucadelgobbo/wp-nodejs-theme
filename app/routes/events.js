var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getEditionMenu(req, function( submenu ) {
		helpers.getEvent(req, function( result ) {
			res.render('events', {data: result, submenu:submenu});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
