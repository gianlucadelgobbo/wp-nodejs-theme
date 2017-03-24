var helpers = require('../../helpers');

exports.get = function get(req, res) {
	helpers.setSessions(req, function() {
		console.log("result._post_template");
		helpers.getEdition(req, function( result ) {
			console.log("result._post_template2");
			//console.log(result);
			meta_data.title = (result.title ? result.title+ " | " : "") + config.project_name+ " "+ meta_data.editions[req.session.sessions.current_edition].title;
			res.render(config.prefix+'/'+'edition', {result: result, page_data:page_data, sessions:req.session.sessions});
		});
	});
};

exports.getArtist = function getArtist(req, res) {
	helpers.setSessions(req, function() {
		helpers.getEditionArtist(req, function( result ) {
			console.log(result._post_template);
			meta_data.title = (result.title ? result.title+ " | " : "") + config.project_name+ " "+ meta_data.editions[req.session.sessions.current_edition].title;
			res.render(config.prefix+'/'+'edition_artists', {result: result, page_data:page_data, sessions:req.session.sessions});
		});
	});
};

exports.getGallery = function getGallery(req, res) {
	helpers.setSessions(req, function() {
		helpers.getEditionArtistGallery(req, function( result ) {
			console.log(result._post_template);
			meta_data.title = (result.title ? result.title+ " | " : "") + config.project_name+ " "+ meta_data.editions[req.session.sessions.current_edition].title;
			res.render(config.prefix+'/'+'edition_artists', {result: result, page_data:page_data, sessions:req.session.sessions});
		});
	});
};

exports.getAll = function getAll(req, res) {
	helpers.setSessions(req, function() {
		helpers.getAllEditions(req, config.sez.editions.limit, 1, function( results ) {
			meta_data.title = "Editions | " + config.project_name+ " "+ meta_data.editions[req.session.sessions.current_edition].title;
			res.render(config.prefix+'/'+'editions', {results: results, page_data:page_data, sessions:req.session.sessions});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
