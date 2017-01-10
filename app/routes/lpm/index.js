var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.getMetaData(req, function( meta_data ) {
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
        var now = new Date();
        var yearAfter = now.getMonth()>7 ? now.getFullYear() : now.getFullYear()-1;
        var years = yearAfter+"-"+now.getFullYear();
        console.log(years);
        helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAllEditions(req, config.sez.home.editions.limit, 1, function (result_editions) {
            meta_data.meta.title = meta_data.meta.name+ " "+ (meta_data.edition && meta_data.edition.post_title ? meta_data.edition.post_title : "");
            console.log("bingo");
            var obj = {
              results: {news:result_news,events:result_events,editions:result_editions},
              meta_data:meta_data
            };
            jsonfile.writeFile(file, obj, function (err) {
              console.log(err);
            });
            res.render(config.prefix+'/'+'index',obj);
            //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,editions:result_editions}, meta_data:meta_data});
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
