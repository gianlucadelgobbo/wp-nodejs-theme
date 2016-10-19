var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getEditionData(req, function( edition_data ) {
		helpers.getPage(req, function( result ) {
			edition_data.meta.title = (result.title ? result.title+ " | " : "") + edition_data.meta.name+ " "+ edition_data.edition.post_title;
			res.render('page', {data: result, edition_data:edition_data});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
