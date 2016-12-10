exports.get = function get(req, res) {
	console.log("stocazzo");
	helpers.getEditionData(req, function( edition_data ) {
		helpers.getAll(req, config.sez.home.limit, req.params.page ? req.params.page : 1, function( result ) {
			console.log("DAJE");
			edition_data.meta.title = edition_data.meta.name+ " "+ edition_data.edition.post_title;
			res.render(config.prefix+'/'+'editions', {data: result, edition_data:edition_data});
		});
	});
};