var moment = require( 'moment' );

exports.sortByStartDate = function sortByStartDate(a,b) {
  //console.log("sortByStartDate");
  if (a['wpcf-startdate'] < b['wpcf-startdate'])
    return 1;
  if (a['wpcf-startdate'] > b['wpcf-startdate'])
    return -1;
  return 0;
};

exports.setPageData = function setPageData(req, result) {
  //console.log("config.default_lang");
  //console.log(config.default_lang);
  if (!result) result = {};
  var dett=result.post_type && result.post_type!="page";
  var baseurl = req.url;
  //console.log(baseurl);
  for (var lang in config.locales) {
    //console.log("/"+config.locales[lang]+"/");
    baseurl = baseurl.replace("/"+config.locales[lang]+"/", "/");
  }
  //console.log(baseurl);
  //console.log(req.url);
  var page_data = {
    url:req.url,
    langSwitcher: {
      "it": (config.default_lang!="it" ? '/it' + baseurl : baseurl),
      "en": (config.default_lang!="en" ? '/en' + baseurl : baseurl)//,"en": (req.url.indexOf('/it/') === 0 ? req.url.substring(3) : req.url)
    }
  };
  if(result && result['ID']) {
    var title = (result.post_title ? result.post_title+(req.params.tag ? " #"+req.params.tag : "")+" | " : "");
    if (title && dett && req.session.sessions.current_lang != config.default_lang) title+=req.session.sessions.current_lang.toUpperCase()+" | ";
    title+=config.project_name;
    if (title==config.project_name && config.meta.headline) title+=(config.meta.headline ? " | "+config.meta.headline[req.session.sessions.current_lang] : "");
    page_data.title = title;
    page_data.image_src = result.featured && result.featured.full ? result.featured.full : result.featured ? result.featured : config.domain + config.meta.image_src;
    page_data.description = result.meta_description ? this.makeExcerpt(result.meta_description, 160) : config.meta.description[req.session.sessions.current_lang];
  } else {
    page_data.title = "404 "+__("Content NOT found")+" | " + config.project_name;
    page_data.image_src = config.meta.image_src;
    page_data.description = this.makeExcerpt(__("The content you requested was not found on our server, please try to search for it"), 160);
  }
  //console.log(page_data);
  return page_data;
};

/*exports.getCurrentLang = function getCurrentLang(req) {
  //console.log("getCurrentLang");
  var urlA = req.url.split("/");
  //console.log(urlA);
  var lang = urlA.length>1 && config.locales.indexOf(urlA[1])!=-1 ? urlA[1] : config.default_lang;
  if(req.session.sessions.current_lang != lang) {
    req.session.sessions.current_lang = lang;
    require('moment/locale/'+(lang=="en" ? "en-gb" : lang));
    global.setLocale(lang);
  }
};
*/
exports.formatLocation = function formatLocation(l) {
  //console.log(l);
  var loc = {};
  for (var item in l){
    var locA = l[item].split(";");
    if (!loc[locA[2]]) loc[locA[2]] = {};
    if (!loc[locA[2]][locA[1]]) loc[locA[2]][locA[1]] = {};
    if (!loc[locA[2]][locA[1]][locA[0]]) loc[locA[2]][locA[1]][locA[0]] = {lng:locA[3],lat:locA[4]};
  }
  //console.log(loc);
  return loc;
};

exports.getGrid = function getGrid(data) {
  var row=0;
  var col=0;
  var grid = [];
  var rowsN = parseInt(data['wpcf-rows']);
  var columnsN = parseInt(data['wpcf-columns']);
  //if (rowsN>0 && columnsN>0) {
  //}
  if (data['wpcf-same-rows-height']==1) {
    while (row<rowsN) {
      grid[row] = [];
      while (col<columnsN) {
        grid[row][col] = {};
        grid[row][col].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
        grid[row][col].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
        grid[row][col].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
        col++;
      }
      col=0;
      row++;
    }
  } else {
    while (col<columnsN) {
      grid[col] = [];
      while (row<rowsN) {
        grid[col][row] = {};
        grid[col][row].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
        grid[col][row].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
        grid[col][row].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
        row++;
      }
      row=0;
      col++;
    }
  }
  //console.log(grid);
  return grid;
};
exports.get_video = function get_video( url ) {
  var v = {};
  var yts;
  //console.log(url);
  if (url.indexOf("vimeo.com/")>0) {
    //console.log("stocazzo 1");
    yts = url.substring(url.indexOf("video/")+6);
    //console.log(yts);
    //v.embed = "//player.vimeo.com/video/"+url.substring(url.indexOf("vimeo.com/")+10);
    v.embed = "//player.vimeo.com/video/"+yts;
    v.thumb = "http://vimeo.com/api/v2/video/"+yts+".json";
  } else if (url.indexOf("youtube.com/")>0) {
    //var yts = url.substring(url.indexOf("watch?v=")+8);
    //console.log("stocazzo 2");
    yts = url.substring(url.indexOf("embed/")+6);
    //console.log(yts);
    v.embed = "//www.youtube.com/embed/"+yts;
    v.thumb = "//img.youtube.com/vi/"+yts+"/maxresdefault.jpg";
  }
  return v;
};

exports.makeExcerpt = function makeExcerpt(descr,length) {
  var descr2 = descr.replace(/<[^>]+>/ig,"");
  var descrA = descr2.split(" ");
  var d = "";
  for (var item in descrA) {
    if (d.length<length){
      d+=descrA[item]+" "
    }
  }
  return d.trim();
};

exports.fixResults = function fixResults(data) {
  for (var item in data){
    if (data[item] && (data[item].title || data[item].post_title)) data[item] = this.fixResult(data[item]);
  }
  //data.sort("this.sortByStartDate");

  return data;
};
exports.ISODateString = function ISODateString(d) {
  function pad(n) {return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth() + 1)+'-'+ pad(d.getUTCDate())+'T'+ pad(d.getUTCHours())+':'+ pad(d.getUTCMinutes())+':'+ pad(d.getUTCSeconds())+'+01:00'
}

exports.fixResult = function fixResult(data) {
  /*if (typeof(data.video_thumbnail) == "string" && data.video_thumbnail.length>0) {
    data.video = this.get_video(data.video_thumbnail);
  }
  if (data.featured) {
    data.featured.thumbnail = data.featured.thumbnail.replace(/http(.+)files/g, config.domain+"/files");
    data.featured.full = data.featured.full.replace(/http(.+)files/g, config.domain+"/files");
  }
  if (data.capauthors) {
    for(var auth in data.capauthors) {
      data.capauthors[auth].img = data.capauthors[auth].img.replace(/http(.+)files/g, config.domain+"/files");
    }
  }
   */
  //console.log(moment.locale());
  if (data.date) {
    data.date = moment(data.date).utc().format();
    data.datetimeHR = moment(data.date).utc().format("MMMM, Do YYYY, h:mm a");
    data.dateHR = moment(data.date).utc().format("MMMM, Do YYYY");
  }
  if (data['post_modified'] || data['modified']) {
    var dateModified = data['post_modified'] || data['modified'];
    data.dateModified = moment(dateModified).utc().format("DD-MM-YYYY");
    data.datetimeModifiedHR = moment(dateModified).utc().format("MMMM, Do YYYY, h:mm a");
    data.dateModifiedHR = moment(dateModified).utc().format("MMMM, Do YYYY");
  }
  if (!data['wpcf-startdate'] || !data['wpcf-startdate'].length){
    var dd = new Date(dateModified);
    data['wpcf-startdate'] = [dd.getTime()/1000];
  }
  if (data['wpcf-startdate']){
    data['wpcf-startdate'] = parseInt(Array.isArray(data['wpcf-startdate']) ? data['wpcf-startdate'][0] : data['wpcf-startdate']);
    data.startdateISO = this.ISODateString(new Date(data['wpcf-startdate']*1000));
    data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
  }
  if (data['wpcf-enddate']){
    data['wpcf-enddate'] = parseInt(data['wpcf-enddate']);
    data.enddateISO = this.ISODateString(new Date(data['wpcf-enddate']*1000));
    data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
  }
  if (data['wpcf-location']) data['wpcf-location'] = this.formatLocation(data['wpcf-location']);
  if (data['data_evento'] && data['data_evento'].length && typeof (data['data_evento']) == 'object') data['data_evento'] = data['data_evento'][0];
  if (!data['data_evento']) {
    data['data_evento'] = moment(data['post_modified']).utc().format("MMMM D, YYYY");
  }
  data['data_month'] = moment(data['date']).utc().format("MMMM YYYY");
  data['datePublished'] = moment(data['date']).utc().format("DD-MM-YYYY");
  return data;
};