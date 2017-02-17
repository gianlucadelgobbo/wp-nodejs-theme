var helpers = require('../../helpers');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPage(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
        if (pug == "avnode/page_newsletter" || pug == "avnode/page_contacts") {
          result.countries = require('../../country-list');
          result.body = {};
        }
        res.render(pug, {result: result, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};
exports.post = function post(req, res) {
  var request = require("request");
  if (req.body.formtype == "newsletter") {
    helpers.validateFormNewsletter(req.body, function(e, o) {
      if (req.body.ajax) {
        console.log("ajaxajaxajaxajaxajaxajax");
        console.log(req.body);
        console.log(e);
        if (e.length) {
          res.status(200).send({type:"danger", message: __("Subscription failed")});
        } else {
          var interests = {};
          if (Array.isArray(req.body.topics)){
            console.log("è array");
            for (var item in req.body.topics) interests[req.body.topics[item]] = true;
          } else {
            interests[req.body.topics] = true;
          }
          request({
              method: 'POST',
              url: config.accounts.newsletter.url+"/members",
              body: JSON.stringify({
                "email_address": req.body.email,
                "status": "subscribed",
                "double_optin": false,
                "interests" : interests
              }),
              headers: {
                Authorization: 'apikey '+config.accounts.newsletter.apikey,
                'Content-Type': 'application/json'
              }
            },
            function(error, response, body){
              if(error) {
                res.status(200).send({type:"danger", message: __("Subscription failed")});
              } else {
                var bodyObj = JSON.parse(body);
                if (bodyObj.id) {
                  res.status(200).send({type:"success", message: __("Congratulations! Your subscription was successful")});
                } else {
                  res.status(200).send({type:"danger", message: __("Warning!")+" "+bodyObj.title});
                }
              }
            }
          );
        }
      } else {
        helpers.getMetaData(req, function( meta_data ) {
          helpers.getPage(req, function( result ) {
            if(result['ID']) {
              meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + meta_data.meta.name;
              if (result.featured) meta_data.meta['image_src'] = result.featured.full;
              if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              console.log(pug);
              if (e.length) {
                result.body = o;
                res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
              } else {
                mailer.send(config.accounts.emails.gmail, message, function(e, c){
                  console.log("ECCHICE");
                  console.log(e);
                  console.log(o);
                  if (e.length) {
                    res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
                  } else {
                    res.render(pug, {result: result, msg:{c:c}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
                  }
                });
              }
            } else {
              res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
            }
          });
        });
      }
    });
  } else {
    var mailer = require('../../mailer');
    var message = {
      text: __('New Messagge from: {{name}} <{{email}}>\n\n{{message}}\n\nMessagge sent from {{website}}', { name: req.body.name, email:req.body.email, message:req.body.message, website:config.domain+req.url}),
      from: config.accounts.emails.defaults[req.params.page].from_name+' <'+ config.accounts.emails.defaults[req.params.page].from_email + ">",
      to: config.accounts.emails.defaults[req.params.page].to_name+' <'+config.accounts.emails.defaults[req.params.page].to_email+'>',
      cc: '',
      subject: __('[{{project_name}} Mailer] New Messagge from {{name}}', { name: req.body.name, project_name:config.project_name}),
      /*subject: req.body.subject,
      attachment: [
        {data:req.body.text.replace(/(?:\r\n|\r|\n)/g, '<br />'), alternative:true},
        {path:req.body.folderfile, type:"application/pdf", name:req.body.file}
      ]*/
    };
    helpers.validateFormEmail(req.body, function(e, o) {
      if (req.body.ajax) {
        if (e.length) {
          res.status(200).send({type:"danger", message: __("Messagge sent failed")});
        } else {
          mailer.send(config.accounts.emails.gmail, message, function(e, c){
            if (e.length) {
              res.status(200).send({type:"danger", message: e[0].m});
            } else {
              res.status(200).send({type:"success", message: c[0].m});
            }
          });
        }
      } else {
        helpers.getMetaData(req, function( meta_data ) {
          helpers.getPage(req, function( result ) {
            if(result['ID']) {
              meta_data.meta.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + meta_data.meta.name;
              if (result.featured) meta_data.meta['image_src'] = result.featured.full;
              if (result.meta_description) meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              console.log(pug);
              if (e.length) {
                result.body = o;
                res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
              } else {
                mailer.send(config.accounts.emails.gmail, message, function(e, c){
                  if (e.length) {
                    res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
                  } else {
                    res.render(pug, {result: result, msg:{c:c}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q});
                  }
                });
              }
            } else {
              res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
            }
          });
        });
      }
    });
  }
};

exports.getSubpage = function getSubpage(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPage(req, function( result ) {
      if(result['ID']) {
        meta_data.meta.title = (result.post_parent ? result.post_parent.post_title+ ": " : "") + (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + meta_data.meta.name;
        if (result.featured) meta_data.meta['image_src'] = result.featured.full;
        if (result.post_excerpt) {
          meta_data.meta['og_description'] = fnz.makeExcerpt(result.post_excerpt, 160);
        } else {
          meta_data.meta['og_description'] = fnz.makeExcerpt(result.meta_description, 160);
        }
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].pugpage ? config.sez.pages.conf[req.params.subpage].pugpage : config.sez.pages.conf.default.subpage);
        console.log("getSubpage");
        console.log(result);
        var itemtype = config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].itemtype ? config.sez.pages.conf[req.params.subpage].itemtype : config.sez.pages.conf.default.itemtype;
        console.log(itemtype);
        res.render(pug, {result: result, meta_data:meta_data, itemtype:itemtype,q:req.query.q,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};
exports.getGallery = function getGallery(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    req.params.page = "gallery";
    helpers.getPage(req, function( result ) {
      var request = require('request');
      if (result.post_content.indexOf(">ERROR<")===-1) {
        if (req.params.artist && req.params.gallery) {
          var url = "https://flxer.net/api/"+req.params.artist+"/gallery/"+req.params.gallery+(req.params.galleryitem ? "/"+req.params.galleryitem :"")+"/";
          console.log(url);
          request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              result.post_gallery = JSON.parse(body);
              //console.log(result.post_gallery);
              meta_data.meta.title = (result.title ? result.title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + meta_data.meta.name+ " "+ meta_data.edition.post_title;
              res.render(config.prefix+'/'+'gallery_dett', {result: result, meta_data:meta_data, include_gallery:true});
            }
          });
        } else {
          var shortcode = require('shortcode-parser');
          result.post_content = result.post_content.replace("source=https","source='https").replace("/ view=","/' view='").replace("]","']");
          console.log(result.post_content);
          //var str = "[avnode source='https://flxer.net/api/lpm-team/events/lpm-live-performers-meeting/' view='gallery']";
          shortcode.add('avnode', function(buf, opts) {
            if (opts.source) {
              console.log("/stoqui2");
              request(opts.source, function (error, response, body) {
                console.log("/stoqui3");
                console.log(error);
                if (!error && response.statusCode == 200) {
                  result.post_gallery = JSON.parse(body).gallery;
                  //console.log(result.post_gallery);
                  meta_data.meta.title = (result.title ? result.title+ " | " : "") + meta_data.meta.name+ " "+ meta_data.edition.post_title;
                  res.render(config.prefix+'/'+'gallery', {result: result, meta_data:meta_data, include_gallery:false});
                }
              });
            }
          });
          console.log("/stoqui1");
          shortcode.parse(result.post_content);
        }
        /*
        var shortcode = require('shortcode-parser');
        result.post_content = result.post_content.replace("source=https","source='https").replace("/ view=","/' view='").replace("]","']");
        var str = "[avnode source='https://flxer.net/api/lpm-team/events/lpm-live-performers-meeting/' view='gallery']";
        shortcode.add('avnode', function(buf, opts) {
          if (opts.source) {

          }
        });
        */
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
      //shortcode.parse(result.post_content);
      //console.log(shortcode.parse(str));
      /*var url = "https://flxer.net/api/lpm-team/events/lpm-live-performers-meeting/";
      */
    });
  });
};

exports.get404 = function get404(req, res) {
  console.log("get404 "+req.url);
  helpers.getMetaData(req, function( meta_data ) {
    res.render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
  });
};



/*
exports.getSearch = function getSearch(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    res.render(config.prefix+'/search', {meta_data:meta_data, itemtype:"WebPage"});
  });
};

*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
