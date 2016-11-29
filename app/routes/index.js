var helpers = require('./../helpers');

exports.get = function get(req, res) {
	helpers.getMetaData(req, function( meta_data ) {
		helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
			helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
				helpers.getAllWeb(req, config.sez.home.web.limit, 1, function (result_web) {
					helpers.getAllLearning(req, config.sez.home.learning.limit, 1, function (result_learning) {
						helpers.getAllVideo(req, config.sez.home.videos.limit, 1, function (result_videos) {
							helpers.getAllLab(req, config.sez.home.lab.limit, 1, function (result_lab) {
								helpers.getAllAward(req, config.sez.home.award.limit, 1, function (result_award) {
									console.log(result_learning);
									meta_data.meta.title = meta_data.meta.name+ " "+ meta_data.post_title;
									res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,web:result_web,learning:result_learning,videos:result_videos,lab:result_lab,awards:result_award}, meta_data:meta_data});
								});
							});
						});
					});
				});
			});
		});
	});
};

