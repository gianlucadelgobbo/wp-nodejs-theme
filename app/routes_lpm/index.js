var helpers = require('./../helpers');

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
      helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
        helpers.getAllEditions(req, config.sez.home.editions.limit, 1, function (result_editions) {
          meta_data.meta.title = meta_data.meta.name+ " "+ meta_data.edition.post_title;
          console.log("bingo");
          res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,editions:result_editions}, meta_data:meta_data});
        });
      });
    });
  });
};

