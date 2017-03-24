var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.setSessions(req, function() {
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAllEditions(req, config.sez.home.editions.limit, 1, function (result_editions) {
            meta_data.title = config.project_name+ " "+ (meta_data.edition && meta_data.editions[req.session.sessions.current_edition].title ? meta_data.editions[req.session.sessions.current_edition].title : "");
            console.log("bingo");
            var obj = {
              results: {news:result_news,events:result_events,editions:result_editions},
              page_data:page_data, sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj, function (err) {
              console.log(err);
            });
            res.render(config.prefix+'/'+'index',obj);
            //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,editions:result_editions}, page_data:page_data, sessions:req.session.sessions});
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.meta_data = meta_data;
      meta_data.title = config.project_name;
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

