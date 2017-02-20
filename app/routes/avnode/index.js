var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var ig = require('instagram-node').instagram();
ig.use({ client_id: '818216a3ba354059b19c8464d87ca865', client_secret: '6220780a13ad48f989c191865969c09f' });

exports.get = function get(req, res) {
  console.log("ecchime");
  console.log(config.sez.home);
  var file = config.root+'/tmp/'+config.prefix+'/home_'+(req.url.indexOf('/it/')===0 ? 'it' : 'en')+'.json';
  helpers.getMetaData(req, function( meta_data ) {
    if (req.query.createcache==1 || !fs.existsSync(file) || req.query.code){
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAll(req, config.sez.activities, config.sez.home.activities.limit, 1, function (result_activities) {
            meta_data.meta.title = meta_data.meta.name;
            console.log("bingo");
            console.log(result_activities);
            //var redirect_uri = config.domain+"/"/*+req.url*/;
            var redirect_uri = "http://localhost:3007/";
            console.log(redirect_uri);
            var obj = {
              results: {news:result_news,events:result_events,activities:result_activities/**/},
              meta_data:meta_data
            };
            if (req.query.code) {
              ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
                if (err) {
                  console.log(err);
                  console.log("Didn't work"+req.query.code);
                  console.log(redirect_uri);
                } else {
                  console.log('Yay! Access token is ' + result.access_token);
                  ig.use({ access_token: result.access_token });

                  ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
                    //ig.use({ access_token: '818216a3ba354059b19c8464d87ca865' });
                    obj.insta = [];
                    console.log("instagram-node");
                    for(var item in medias) {
                      obj.insta.push({
                        img:medias[item].images.low_resolution,
                        likes:medias[item].likes.count,
                        comments:medias[item].comments.count,
                        link:medias[item].link
                      });
                      console.log(medias[item].images.thumbnail);
                      console.log(medias[item].images.standard_resolution);
                      console.log(medias[item].images.low_resolution);
                      console.log(medias[item].likes.count);
                      console.log(medias[item].comments.count);
                      console.log(medias[item].link);
                    }
                    //console.log(err);
                    //console.log(medias);
                    //console.log(pagination);
                    //console.log(remaining);
                    //console.log(limit);
                    jsonfile.writeFile(file, obj, function (err) {
                      console.log(err);
                    });
                    res.render(config.prefix+'/'+'index',obj);
                  });

                }
              });
            } else {
              var url = 'https://api.instagram.com/oauth/authorize/?client_id='+'818216a3ba354059b19c8464d87ca865'+'&redirect_uri='+redirect_uri+'&response_type=code'
              res.redirect(url);
              //res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['likes']}));
            }
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

