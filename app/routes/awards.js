var helpers = require('./../helpers');

exports.get = function get(req, res) {
	if (req.url.indexOf('/it/')===0) req.params.lang = "it";
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAward(req, function( result ) {
			meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name;
			res.render(config.prefix+'/'+'award', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getPostType(req, "awards-and-grants", function( posttype ) {
			helpers.getAllAward(req, config.sez.awards.limit, 1, function( result ) {
				meta_data.meta.title = __("Awards & Grants") + " | " + meta_data.meta.name;
				res.render(config.prefix+'/'+'awards', {data: result, meta_data:meta_data, posttype:posttype});
			});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
