var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getWeb(req, function( result ) {
			meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
			if (result.featured) meta_data.meta['image_src'] = result.featured.full;
			if (result.meta_description) meta_data.meta['og_description'] = result.meta_description;
			res.render(config.prefix+'/'+'web', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getPostType(req, "web-and-mobile", function( posttype ) {
			helpers.getAllWeb(req, config.sez.web.limit, 1, function( result ) {
				meta_data.meta.title = "Web & Mobile | " + meta_data.meta.name;
				res.render(config.prefix+'/'+'webs', {data: result, meta_data:meta_data, posttype:posttype});
			});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
