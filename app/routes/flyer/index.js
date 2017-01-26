var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.getMetaData(req, function( meta_data ) {
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getPage({"params":{"page":"profile"},"url":req.url}, function( profile ) {
        helpers.getContainerPage(req, "news", function( posttype_news ) {
          helpers.getContainerPage(req, "events", function( posttype_events ) {
            helpers.getContainerPage(req, "web-and-mobile", function( posttype_web ) {
              helpers.getContainerPage(req, "learning", function( posttype_learning ) {
                helpers.getContainerPage(req, "videos", function( posttype_video ) {
                  helpers.getContainerPage(req, "lab", function( posttype_lab ) {
                    helpers.getContainerPage(req, "awards-and-grants", function( posttype_awards ) {
                      helpers.getAll(req, config.sez["news"], config.sez.home.news.limit, 1, function (result_news) {
                        helpers.getAll(req, config.sez["events"], config.sez.home.events.limit, 1, function (result_events) {
                          helpers.getAll(req, config.sez["web-and-mobile"], config.sez.home.web.limit, 1, function (result_web) {
                            helpers.getAll(req, config.sez["learning"], config.sez.home.learning.limit, 1, function (result_learning) {
                              helpers.getAll(req, config.sez["videos"], config.sez.home.videos.limit, 1, function (result_videos) {
                                helpers.getAll(req, config.sez["lab"], config.sez.home.lab.limit, 1, function (result_lab) {
                                  helpers.getAll(req, config.sez["awards-and-grants"], config.sez.home.award.limit, 1, function (result_award) {
                                    meta_data.meta.title = meta_data.meta.name+" | "+meta_data.meta.description;
                                    var obj = {
                                      results: {news:result_news,events:result_events,web:result_web,learning:result_learning,videos:result_videos,lab:result_lab,awards:result_award},
                                      meta_data:meta_data,posttype_events:posttype_events,profile:profile,posttype_lab:posttype_lab,posttype_web:posttype_web,posttype_video:posttype_video,posttype_learning:posttype_learning,posttype_news:posttype_news,posttype_awards:posttype_awards
                                    };
                                    jsonfile.writeFile(file, obj, function (err) {
                                      if(err) console.log(err);
                                    });
                                    res.render(config.prefix+'/'+'index',obj);
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.meta_data = meta_data;
      meta_data.meta.title = meta_data.meta.name+" | "+meta_data.meta.description;
      res.render(config.prefix+'/'+'index',obj);
    }
  });

};

