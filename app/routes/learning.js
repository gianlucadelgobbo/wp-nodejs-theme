var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getLearning(req, function( result ) {
			meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
			res.render(config.prefix+'/'+'learning', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getPostType(req, "learning", function( posttype ) {
			helpers.getAllLearning(req, config.sez.learning.limit, 1, function( result ) {
				meta_data.meta.title = __("Learnings") + " | " + meta_data.meta.name;
				res.render(config.prefix+'/'+'learnings', {data: result, meta_data:meta_data, posttype:posttype});
			});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
