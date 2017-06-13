var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.setSessions(req, function() {
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAll(req, config.sez.prenatal, config.sez.home.prenatal.limit, 1, function (result_exhibitions) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news,events:result_events,exhibitions:result_exhibitions},
              page_data:page_data, sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj, function (err) {
              //console.log(err);
            });
            res.render(config.prefix+'/'+'index',obj);
            //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,exhibitions:result_exhibitions}, page_data:page_data, sessions:req.session.sessions});
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","");
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};
