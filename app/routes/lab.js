var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getLab(req, function( result ) {
			meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
			res.render(config.prefix+'/'+'lab', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getPostType(req, "lab", function( posttype ) {
			helpers.getAllLab(req, config.sez.labs.limit, 1, function( result ) {
				meta_data.meta.title = __("Lab") + " | " + meta_data.meta.name;
				res.render(config.prefix+'/'+'labs', {data: result, meta_data:meta_data, posttype:posttype});
			});
		});
	});
};


//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
