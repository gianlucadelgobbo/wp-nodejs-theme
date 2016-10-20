var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getEditionData(req, function( edition_data ) {
		helpers.getPage(req, function( result ) {
			var conf = {
				'idea':{'itemtype':'AboutPage','pugpage':'page'},
				'timeline':{'itemtype':'CollectionPage','pugpage':'page'},
				'map':{'itemtype':'Map','pugpage':'page'},
				'gallery':{'itemtype':'ImageGallery','pugpage':'page'},
				'the-app':{'itemtype':'ItemPage','pugpage':'page'},
				'press':{'itemtype':'CollectionPage','pugpage':'page'},
				'contacts':{'itemtype':'ContactPage','pugpage':'page'},
				'avnode-lpm-2015-2018':{'itemtype':'ItemPage','pugpage':'page_title_only'},
				'search':{'itemtype':'SearchResultsPage','pugpage':'page'},
				'cart':{'itemtype':'QAPage','pugpage':'page'},
				'checkout':{'itemtype':'CheckoutPage','pugpage':'page'},
				'default':{'itemtype':'ItemPage','pugpage':'page'}
			};
			edition_data.meta.title = (result.title.rendered ? result.title.rendered+ " | " : "") + edition_data.meta.name+ " "+ edition_data.edition.post_title;
			console.log(result);
			res.render(conf[req.params.page].pugpage ? conf[req.params.page].pugpage : conf.default.pugpage, {data: result, edition_data:edition_data, itemtype:conf[req.params.page].itemtype ? conf[req.params.page].itemtype : conf.default.itemtype});
		});
	});
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
