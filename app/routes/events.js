var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getEvent(req, function( result ) {
			meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + meta_data.meta.name;
			if (result.featured) meta_data.meta['image_src'] = result.featured.full;
			res.render(config.prefix+'/'+'event', {data: result, meta_data:meta_data});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllEvents(req, config.sez.events.limit, 1, function( result ) {
			meta_data.meta.title = "Events | " + meta_data.meta.name+ " "+ meta_data.edition.post_title;
			res.render(config.prefix+'/'+'events', {data: result, meta_data:meta_data});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
