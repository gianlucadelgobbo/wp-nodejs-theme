var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getEditionData(req, function( edition_data ) {
		helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
			helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
				helpers.getAllEditions(req, config.sez.home.editions.limit, 1, function (result_editions) {
					edition_data.meta.title = edition_data.meta.name+ " "+ edition_data.edition.post_title;
					res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,editions:result_editions}, edition_data:edition_data});
				});
			});
		});
	});
};

