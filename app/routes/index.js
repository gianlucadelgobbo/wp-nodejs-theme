var helpers = require('./../helpers');
var fnz = require('./../functions');
var jsonfile = require('jsonfile');

exports.get = function get(req, res) {
  var file = config.root+'/tmp/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
    helpers.getMetaData(req, function( meta_data ) {
      if (req.query.createcache==1){
        helpers.getPage({"params":{"page":"profile"},"url":""}, function( profile ) {
          profile['wpcf-row-1-col-1-html-box'] = fnz.makeExcerpt(profile['wpcf-row-1-col-1-html-box'],280);
          profile['wpcf-row-1-col-2-html-box'] = fnz.makeExcerpt(profile['wpcf-row-1-col-2-html-box'],280);
          profile['wpcf-row-1-col-3-html-box'] = fnz.makeExcerpt(profile['wpcf-row-1-col-3-html-box'],280);
          //profile['wpcf-row-1-col-4-html-box'] = fnz.makeExcerpt(profile['wpcf-row-1-col-4-html-box'],280);
          helpers.getAllNews(req, config.sez.home.news.limit, 1, function (result_news) {
            helpers.getPostType(req, "events", function( posttype_events ) {
              posttype_events.excerpt = fnz.makeExcerpt(posttype_events.description,280);
              helpers.getPostType(req, "lab", function( posttype_lab ) {
                posttype_lab.excerpt = fnz.makeExcerpt(posttype_lab.description,280);
                helpers.getPostType(req, "web-and-mobile", function( posttype_web ) {
                  posttype_web.excerpt = fnz.makeExcerpt(posttype_web.description,280);
                  helpers.getPostType(req, "videos", function( posttype_video ) {
                    posttype_video.excerpt = fnz.makeExcerpt(posttype_video.description,280);
                    helpers.getAllEvents(req, config.sez.home.events.limit, 1, function (result_events) {
                      helpers.getAllWeb(req, config.sez.home.web.limit, 1, function (result_web) {
                        helpers.getAllLearning(req, config.sez.home.learning.limit, 1, function (result_learning) {
                          helpers.getAllVideo(req, config.sez.home.videos.limit, 1, function (result_videos) {
                            helpers.getAllLab(req, config.sez.home.lab.limit, 1, function (result_lab) {
                              helpers.getAllAward(req, config.sez.home.award.limit, 1, function (result_award) {
                                meta_data.meta.title = meta_data.meta.name+ " "+ meta_data.post_title;
                                var obj = {data: {news:result_news,events:result_events,web:result_web,learning:result_learning,videos:result_videos,lab:result_lab,awards:result_award}, meta_data:meta_data,posttype_events:posttype_events,profile:profile,posttype_lab:posttype_lab,posttype_web:posttype_web,posttype_video:posttype_video};
                                jsonfile.writeFile(file, obj, function (err) {
                                  console.error(config.root);
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
      } else {
        var obj = jsonfile.readFileSync(file);
        obj.meta_data = meta_data;
        res.render(config.prefix+'/'+'index',obj);
      }
    });

};

