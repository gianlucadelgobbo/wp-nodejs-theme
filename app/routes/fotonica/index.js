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
          helpers.getAllEditionsByYear(req, null, config.sez.home.editions.limit, 1, function (result_editions) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news,events:result_events,editions:result_editions},
              page_data:page_data, sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj, function (err) {
              //console.log(err);
              var user_sez = "team";
              helpers.getAllUsers(req, user_sez, function( results ) {
                var file = config.root+'/tmp/'+config.prefix+'/users_'+user_sez+'_'+req.session.sessions.current_lang+'.json';
                jsonfile.writeFile(file, results, function (err) {
                  //if(err) console.log(err);
                  var user_sez = "partners";
                  helpers.getAllUsers(req, user_sez, function( results ) {
                    var file = config.root+'/tmp/'+config.prefix+'/users_'+user_sez+'_'+req.session.sessions.current_lang+'.json';
                    jsonfile.writeFile(file, results, function (err) {
                      //console.log(obj.results.web);
                      res.render(config.prefix+'/'+'index',obj);
                    });
                  });
                });
              });
            });
            //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,editions:result_editions}, page_data:page_data, sessions:req.session.sessions});
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","")
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

