var helpers = require('../../helpers');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  helpers.getMetaData(req, function( meta_data ) {
    helpers.getPage(req, function( result ) {
      if(result['ID']) {
        meta_data.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
        if (result.featured) meta_data.image_src = result.featured.full;
        if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
        var check = pug.split("/")[1];
        if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
          result.countries = require('../../country-list');
          result.body = {};
          var form = pug.split("_")[1];
          pug = config.prefix+"/page";
        }
        res.render(pug, {result: result, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
      } else {
        res.status(404).render(config.prefix+'/404', {meta_data:meta_data, itemtype:"WebPage"});
      }
    });
  });
};
exports.post = function post(req, res) {
  var request = require("request");
  if (req.body.formtype == "join") {
    var mailer = require('../../mailer');
    var message = {
      text: __('New Join submission from: {{name}} <{{email}}>\n\nOrganization name: {{organization_name}}\n\nOrganization country: {{organization_country}}\n\nOrganization activity description\n{{activity_description}}\n\nActivities name list\n{{activity_list}}\n\nMessagge sent from {{website}}', { name: req.body.name, email:req.body.email, organization_name: req.body.organization_name, organization_country:req.body.organization_country, activity_description:req.body.activity_description, activity_list:req.body.activity_list, website:config.domain+req.url}),
      from: config.accounts.emails.defaults[req.params.page].from_name+' <'+ config.accounts.emails.defaults[req.params.page].from_email + ">",
      to: config.accounts.emails.defaults[req.params.page].to_name+' <'+config.accounts.emails.defaults[req.params.page].to_email+'>',
      cc: '',
      subject: __('[{{project_name}} Mailer] New Join from {{organization_name}}', { organization_name: req.body.organization_name, project_name:config.project_name}),
      /*subject: req.body.subject,
       attachment: [
       {data:req.body.text.replace(/(?:\r\n|\r|\n)/g, '<br />'), alternative:true},
       {path:req.body.folderfile, type:"application/pdf", name:req.body.file}
       ]*/
    };
    helpers.validateFormJoin(req.body, function(e, o) {
      if (req.body.ajax) {
        if (e.length) {
          var estr = "<ul>";
          for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
          estr+= "</ul>";
          res.status(200).send({type:"danger", message: estr});
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
              meta_data.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
              if (result.featured) meta_data.image_src = result.featured.full;
              if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              var check = pug.split("/")[1];
              if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                result.countries = require('../../country-list');
                result.body = {};
                var form = pug.split("_")[1];
                pug = config.prefix+"/page";
              }
              if (e.length) {
                result.body = o;
                res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
              } else {
                mailer.send(config.accounts.emails.gmail, message, function(e, c){
                  if (e.length) {
                    res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                  } else {
                    res.render(pug, {result: result, msg:{c:c}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
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
  } else if (req.body.formtype == "newsletter") {
    helpers.validateFormNewsletter(req.body, function(e, o) {
      var interests = {};
      if (Array.isArray(req.body.topics)){
        for (var item in req.body.topics) interests[req.body.topics[item]] = true;
      } else {
        interests[req.body.topics] = true;
      }
      interests[config.accounts.newsletter.site_from] = true;
      var merge_fields = {};
      if (req.body.name) merge_fields.FNAME = req.body.name;
      if (req.body.surname) merge_fields.LNAME = req.body.surname;
      if (req.body.country) merge_fields.MMERGE6 = req.body.country;
      if (req.body.organization_name) merge_fields.MMERGE4 = req.body.organization_name;
      if (req.body.ajax) {
        console.log("ajaxajaxajaxajaxajaxajax");
        if (e.length) {
          var estr = "<ul>";
          for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
          estr+= "</ul>";
          res.status(200).send({type:"danger", message: estr});
        } else {
          request({
              method: 'POST',
              url: config.accounts.newsletter.url+"/members",
              body: JSON.stringify({
                "merge_fields": merge_fields,
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
              meta_data.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
              if (result.featured) meta_data.image_src = result.featured.full;
              if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              var check = pug.split("/")[1];
              if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                result.countries = require('../../country-list');
                result.body = {};
                var form = pug.split("_")[1];
                pug = "avnode/page";
              }
              result.body = o;
              if (e.length) {

                res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
              } else {
                request({
                    method: 'POST',
                    url: config.accounts.newsletter.url+"/members",
                    body: JSON.stringify({
                      "merge_fields": merge_fields,
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
                    console.log("ECCHICE");
                    console.log(error);
                    console.log(response);
                    console.log(body);
                    if(error) {
                      res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                    } else {
                      var bodyObj = JSON.parse(body);
                      if (bodyObj.id) {
                        res.render(pug, {result: result, msg:{c:[{m:__("Subscription success!!!")}]}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      } else {
                        res.render(pug, {result: result, msg:{e:[{m:__(bodyObj.title)}]}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      }
                    }
                  }
                );
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
          var estr = "<ul>";
          for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
          estr+= "</ul>";
          res.status(200).send({type:"danger", message: estr});
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
              meta_data.title = (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
              if (result.featured) meta_data.image_src = result.featured.full;
              if (result.meta_description) meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              var check = pug.split("/")[1];
              if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                result.countries = require('../../country-list');
                result.body = {};
                var form = pug.split("_")[1];
                pug = "avnode/page";
              }
              if (e.length) {
                result.body = o;
                res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
              } else {
                mailer.send(config.accounts.emails.gmail, message, function(e, c){
                  if (e.length) {
                    res.render(pug, {result: result, msg:{e:e}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                  } else {
                    res.render(pug, {result: result, msg:{c:c}, meta_data:meta_data,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
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
        meta_data.title = (result.post_parent ? result.post_parent.post_title+ ": " : "") + (result.post_title ? result.post_title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name;
        if (result.featured) meta_data.image_src = result.featured.full;
        if (result.post_excerpt) {
          meta_data.description[config.current_lang] = fnz.makeExcerpt(result.post_excerpt, 160);
        } else {
          meta_data.description[config.current_lang] = fnz.makeExcerpt(result.meta_description, 160);
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
              meta_data.title = (result.title ? result.title+ " | " : "") + (config.current_lang == config.default_lang ? "" : config.current_lang.toUpperCase()+" | ") + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
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
                  meta_data.title = (result.title ? result.title+ " | " : "") + config.project_name+ " "+ meta_data.editions[config.current_edition].title;
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
