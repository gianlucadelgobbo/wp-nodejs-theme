var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/tmp/'+config.prefix+'/home_'+req.session.sessions.current_lang+'.json';
    var user_sez = "team";
    var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      //console.log("getAll news");
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        //console.log("getAll events");
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          //console.log("getAll editions");
          helpers.getAllEditionsByYear(req, null, config.sez.home.editions.limit, 1, function (result_editions) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news,events:result_events,editions:result_editions},
              page_data:page_data,
              sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj, function (err) {
              //console.log("writeFile");
              //if(err) console.log(err);
              res.render(config.prefix+'/'+'index',obj);
            });
          });
        });
      });
    } else if (req.query.createusers==1 || !fs.existsSync(userfile)){
      //console.log("getAllUsers team");
      helpers.getAllUsers(req, user_sez, function( results ) {
        //console.log("writeFile "+userfile);
        jsonfile.writeFile(userfile, results, function (err) {
          //if(err) console.log(err);
          var user_sez = "partners";
          //console.log("getAllUsers partners");
          helpers.getAllUsers(req, user_sez, function( results ) {
            var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
            //console.log("writeFile "+userfile);
            jsonfile.writeFile(userfile, results, function (err) {
              //console.log(obj.results.web);
              var obj = jsonfile.readFileSync(file);
              res.render(config.prefix+'/'+'index',obj);
            });
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

