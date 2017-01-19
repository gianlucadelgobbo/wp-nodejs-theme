var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  console.log("ecchime");
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.getMetaData(req, function( meta_data ) {
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAll(req, config.sez.activities, config.sez.home.activities.limit, 1, function (result_activities) {
            meta_data.meta.title = meta_data.meta.name;
            console.log("bingo");
            console.log(result_activities);
            var obj = {
              results: {news:result_news,events:result_events,activities:result_activities/**/},
              meta_data:meta_data
            };
            jsonfile.writeFile(file, obj, function (err) {
              console.log(err);
            });
            res.render(config.prefix+'/'+'index',obj);
            //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,activities:result_activities}, meta_data:meta_data});
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.meta_data = meta_data;
      meta_data.meta.title = meta_data.meta.name;
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

