var indexRoutes = require('./routes/lpm/index');
var editionsRoutes = require('./routes/lpm/editions');
var devsRoutes = require('./routes/lpm/devs');
var timelinemapRoutes = require('./routes/lpm/timeline-map');

var sitemapRoutes = require('./routes/_common/sitemap');
var signupRoutes = require('./routes/_common/signup');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');
var robotsRoutes = require('./routes/_common/robots');
/*
 var searchRoutes = require('./routes/search');
 */
module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/event/2004-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2004-rome/','/editions/2004-rome/'))});
  app.get('/event/2005-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2005-rome/','/editions/2005-rome/'))});
  app.get('/event/2006-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2006-rome/','/editions/2006-rome/'))});
  app.get('/event/2007-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2007-rome/','/editions/2007-rome/'))});
  app.get('/event/2008-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2008-rome/','/editions/2008-rome/'))});
  app.get('/event/2008-mex/*', function(req, res) {res.redirect(301, req.url.replace('/event/2008-mex/','/editions/2008-mex/'))});
  app.get('/event/2009-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2009-rome/','/editions/2009-v/'))});
  app.get('/event/2010-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2010-rome/','/editions/2010-rome/'))});
  app.get('/event/2011-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2011-rome/','/editions/2011-rome/'))});
  app.get('/event/2011-minsk/*', function(req, res) {res.redirect(301, req.url.replace('/event/2011-minsk/','/editions/2011-minsk/'))});
  app.get('/event/2012-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2012-rome/','/editions/2012-rome/'))});
  app.get('/event/2013-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2013-rome/','/editions/2013-rome/'))});
  app.get('/event/2013-cape-town/*', function(req, res) {res.redirect(301, req.url.replace('/event/2013-cape-town/','/editions/2013-cape-town/'))});
  app.get('/event/2013-mex/*', function(req, res) {res.redirect(301, req.url.replace('/event/2013-mex/','/editions/2013-mex/'))});
  app.get('/event/2014-eindhoven/*', function(req, res) {res.redirect(301, req.url.replace('/event/2014-eindhoven/','/editions/2014-eindhoven/'))});
  app.get('/event/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2015-rome/','/editions/2015-rome/'))});
  app.get('/event/2016-amsterdam/*', function(req, res) {res.redirect(301, req.url.replace('/event/2016-amsterdam/','/editions/2016-amsterdam/'))});

  app.get('/events/2004-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2004-rome/','/editions/2004-rome/'))});
  app.get('/events/2005-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2005-rome/','/editions/2005-rome/'))});
  app.get('/events/2006-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2006-rome/','/editions/2006-rome/'))});
  app.get('/events/2007-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2007-rome/','/editions/2007-rome/'))});
  app.get('/events/2008-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2008-rome/','/editions/2008-rome/'))});
  app.get('/events/2008-mex/*', function(req, res) {res.redirect(301, req.url.replace('/events/2008-mex/','/editions/2008-mex/'))});
  app.get('/events/2009-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2009-rome/','/editions/2009-v/'))});
  app.get('/events/2010-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2010-rome/','/editions/2010-rome/'))});
  app.get('/events/2011-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2011-rome/','/editions/2011-rome/'))});
  app.get('/events/2011-minsk/*', function(req, res) {res.redirect(301, req.url.replace('/events/2011-minsk/','/editions/2011-minsk/'))});
  app.get('/events/2012-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2012-rome/','/editions/2012-rome/'))});
  app.get('/events/2013-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2013-rome/','/editions/2013-rome/'))});
  app.get('/events/2013-cape-town/*', function(req, res) {res.redirect(301, req.url.replace('/events/2013-cape-town/','/editions/2013-cape-town/'))});
  app.get('/events/2013-mex/*', function(req, res) {res.redirect(301, req.url.replace('/events/2013-mex/','/editions/2013-mex/'))});
  app.get('/events/2014-eindhoven/*', function(req, res) {res.redirect(301, req.url.replace('/events/2014-eindhoven/','/editions/2014-eindhoven/'))});
  app.get('/events/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2015-rome/','/editions/2015-rome/'))});
  app.get('/events/2016-amsterdam/*', function(req, res) {res.redirect(301, req.url.replace('/events/2016-amsterdam/','/editions/2016-amsterdam/'))});

  app.get('/edition/*', function(req, res) {res.redirect(301, req.url.replace('/edition/','/editions/'))});

  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});

  app.get('/', indexRoutes.get);

  app.get('/meta/', editionsRoutes.getMeta);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get('/sitemap-dev.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-editions-(:edition).xml", sitemapRoutes.get);
  app.get("/sitemap-dev-(:dev).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/team', usersRoutes.getUsers);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/editions/', editionsRoutes.getAll);
  app.get('/editions/(:edition)', editionsRoutes.get);
  app.get('/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/artists/(:artist)', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/artists/(:artist)/performances/(:performance)', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)', editionsRoutes.getGallery);
  app.get('/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', editionsRoutes.getGallery);
  app.get('/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/dev/', devsRoutes.getAll);
  app.get('/dev/(:dev)', devsRoutes.get);
  app.get('/dev/(:dev)/artists', devsRoutes.getArtist);
  app.get('/dev/(:dev)/artists/(:artist)', devsRoutes.getArtist);
  app.get('/dev/(:dev)/artists/(:artist)/performances/(:performance)', devsRoutes.getArtist);
  app.get('/dev/(:dev)/gallery/(:artist)/gallery/(:gallery)', devsRoutes.getGallery);
  app.get('/dev/(:dev)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', devsRoutes.getGallery);
  app.get('/dev/(:dev)/(:subdev)', devsRoutes.get);
  app.get('/dev/(:dev)/(:subdev)/(:subsubdev)', devsRoutes.get);
  app.get('/gallery', pagesRoutes.getGallery);
  app.get('/gallery/(:artist)/(:gallery)', pagesRoutes.getGallery);
  app.get('/gallery/(:artist)/(:gallery)/(:galleryitem)', pagesRoutes.getGallery);
  app.get('/timeline', timelinemapRoutes.getTimeline);
  app.get('/timeline/(:year)/', timelinemapRoutes.getTimeline);
  app.get('/map', timelinemapRoutes.getMap);
  //app.get('/map/(:year)/', timelinemapRoutes.getTimeline);
  //app.post('/timeline/(:year)/', pagesRoutes.postTimeline);
  app.get('/signup', signupRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
