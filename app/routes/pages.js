var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getPage(req, function( data ) {
			console.log(global.getLocale());
			meta_data.meta.title = (data.post_title ? data.post_title+ " | " : "") + meta_data.meta.name+__('Rome');
			res.render(config.prefix+'/'+(config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage), {data: data, meta_data:meta_data, itemtype:config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype});
		});
	});
};
/*
exports.getTimeline = function getTimeline(req, res) {
	helpers.getEditionData(req, function( meta_data ) {
		req.params.page = "timeline";
		helpers.getPage(req, function( data ) {
			meta_data.meta.title = (data.title.rendered ? data.title.rendered+ " | " : "") + meta_data.meta.name;
			var year = parseInt(req.params.year ? req.params.year : new Date().getFullYear());
			helpers.getAllEditionsEvents(req, year, function( data_timeline ) {
				res.render(config.prefix+'/'+(config.sez.pages.conf.timeline.pugpage ? config.sez.pages.conf.timeline.pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : ""), {year: year, data: data, data_timeline:data_timeline, meta_data:meta_data, itemtype:config.sez.pages.conf.timeline.itemtype ? config.sez.pages.conf.timeline.itemtype : config.sez.pages.conf.default.itemtype});
			});
		});
	});
};

exports.postTimeline = function postTimeline(req, res) {
	var year = parseInt(req.params.year ? req.params.year : new Date().getFullYear());
	helpers.getAllEditionsEvents(req, year, function( data_timeline ) {
		res.render(config.prefix+'/'+(config.sez.pages.conf.timeline.pugpage ? config.sez.pages.conf.timeline.pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : ""), {year: year, data_timeline:data_timeline, itemtype:config.sez.pages.conf.timeline.itemtype ? config.sez.pages.conf.timeline.itemtype : config.sez.pages.conf.default.itemtype});
	});
};
*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
