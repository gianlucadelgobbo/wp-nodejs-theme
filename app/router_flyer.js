var indexRoutes = require('./routes/flyer/index');
var sitemapRoutes = require('./routes/_common/sitemap');
var robotsRoutes = require('./routes/_common/robots');
var webRoutes = require('./routes/_common/web');
var videosRoutes = require('./routes/_common/videos');
var eventsRoutes = require('./routes/_common/events');
var learningRoutes = require('./routes/_common/learning');
var labRoutes = require('./routes/_common/lab');
var newsRoutes = require('./routes/_common/news');
var awardsRoutes = require('./routes/_common/awards');
var usersRoutes = require('./routes/_common/users');
var pagesRoutes = require('./routes/_common/pages');
/*
 var searchRoutes = require('./routes/search');
 */

module.exports = function(app) {
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-taxonomy-(:taxonomy).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);

  app.get('/it/portfolio/web-and-mobile/', webRoutes.getAll);
  app.get('/it/portfolio/web-and-mobile/tags/', webRoutes.getAllTags);
  app.get('/it/portfolio/web-and-mobile/(:web)', webRoutes.get);
  app.get('/it/portfolio/web-and-mobile/page/(:page)', webRoutes.getAll);
  app.get('/it/portfolio/web-and-mobile/tags/(:tag)', webRoutes.getTag);

  app.get('/it/portfolio/videos/', videosRoutes.getAll);
  app.get('/it/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/it/portfolio/videos/page/(:page)', videosRoutes.getAll);

  app.get('/it/portfolio/live-visuals/', eventsRoutes.getAll);
  app.get('/it/portfolio/live-visuals/tags/', eventsRoutes.getAllTags);
  app.get('/it/portfolio/live-visuals/(:event)', eventsRoutes.get);
  app.get('/it/portfolio/live-visuals/page/(:page)', eventsRoutes.getAll);
  app.get('/it/portfolio/live-visuals/tags/(:tag)', eventsRoutes.getAllTags);

  app.get('/it/portfolio/learning/', learningRoutes.getAll);
  app.get('/it/portfolio/learning/(:learning)', learningRoutes.get);
  app.get('/it/portfolio/learning/page/(:page)', learningRoutes.getAll);

  app.get('/it/portfolio/lab/', labRoutes.getAll);
  app.get('/it/portfolio/lab/(:lab)', labRoutes.get);
  app.get('/it/portfolio/lab/page/(:page)', labRoutes.getAll);

  app.get('/it/extra/', newsRoutes.getAll);
  app.get('/it/extra/(:new)', newsRoutes.get);
  app.get('/it/extra/page/(:page)', newsRoutes.getAll);

  app.get('/it/portfolio/awards-and-grants/', awardsRoutes.getAll);
  app.get('/it/portfolio/awards-and-grants/(:award)', awardsRoutes.get);
  app.get('/it/portfolio/awards-and-grants/page/(:page)', awardsRoutes.getAll);

  app.get('/it/people', usersRoutes.getUsers);
  app.get('/it/people/(:user)', usersRoutes.get);
  app.get('/it/customers', usersRoutes.getUsers);
  app.get('/it/customers/(:user)', usersRoutes.get);

  app.get('/it/(:page)/', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)', pagesRoutes.getSubpage);

  app.get('/', indexRoutes.get);

  app.get('/portfolio/web-and-mobile/', webRoutes.getAll);
  app.get('/portfolio/web-and-mobile/tags/', webRoutes.getAllTags);
  app.get('/portfolio/web-and-mobile/(:web)', webRoutes.get);
  app.get('/portfolio/web-and-mobile/page/(:page)', webRoutes.getAll);
  app.get('/portfolio/web-and-mobile/tags/(:tag)', webRoutes.getTag);

  app.get('/portfolio/videos/', videosRoutes.getAll);
  app.get('/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/portfolio/videos/page/(:page)', videosRoutes.getAll);

  app.get('/portfolio/live-visuals/', eventsRoutes.getAll);
  app.get('/portfolio/live-visuals/tags/', eventsRoutes.getAllTags);
  app.get('/portfolio/live-visuals/(:event)', eventsRoutes.get);
  app.get('/portfolio/live-visuals/page/(:page)', eventsRoutes.getAll);
  app.get('/portfolio/live-visuals/tags/(:tag)', eventsRoutes.getTag);

  app.get('/portfolio/learning/', learningRoutes.getAll);
  app.get('/portfolio/learning/(:learning)', learningRoutes.get);
  app.get('/portfolio/learning/page/(:page)', learningRoutes.getAll);

  app.get('/portfolio/lab/', labRoutes.getAll);
  app.get('/portfolio/lab/(:lab)', labRoutes.get);
  app.get('/portfolio/lab/page/(:page)', labRoutes.getAll);

  app.get('/extra/', newsRoutes.getAll);
  app.get('/extra/(:new)', newsRoutes.get);
  app.get('/extra/page/(:page)', newsRoutes.getAll);

  app.get('/portfolio/awards-and-grants/', awardsRoutes.getAll);
  app.get('/portfolio/awards-and-grants/(:award)', awardsRoutes.get);
  app.get('/portfolio/awards-and-grants/page/(:page)', awardsRoutes.getAll);

  app.get('/people', usersRoutes.getUsers);
  app.get('/people/(:user)', usersRoutes.get);
  app.get('/customers', usersRoutes.getUsers);
  app.get('/customers/(:user)', usersRoutes.get);

  app.get('/(:page)/', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.getSubpage);

  app.get('*', pagesRoutes.get404);

  //app.get('/users/(:user)', usersRoutes.getUser);
  /*
   app.use('/controlpanel', controlpanelRoutes);
   app.use('/api', apiRoutes);

   app.get('/performers/(:filter)/(:sorting)/(:page)', performersRoutes.get);
   app.get('/performers(*)', performersRoutes.get);

   app.get('/live-visuals/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
   app.get('/events(*)', eventsRoutes.get);

   app.get('/performances/(:filter)/(:sorting)/(:page)', performancesRoutes.get);
   app.get('/performances(*)', performancesRoutes.get);

   app.get('/tvshows/(:filter)/(:sorting)/(:page)', tvshowsRoutes.get);
   app.get('/tvshows(*)', tvshowsRoutes.get);

   app.get('/footage/(:filter)/(:sorting)/(:page)', footagesRoutes.get);
   app.get('/footage(*)', footagesRoutes.get);

   app.get('/playlists/(:filter)/(:sorting)/(:page)', playlistsRoutes.get);
   app.get('/playlists(*)', playlistsRoutes.get);

   app.get('/galleries/(:filter)/(:sorting)/(:page)', galleriesRoutes.get);
   app.get('/galleries(*)', galleriesRoutes.get);

   app.get('/search', searchRoutes.get);

   app.get('/swfdata/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/embed/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/download/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/endpage/(:user)/footage/(:footage)', swfdataRoutes.get);

   app.get('/image', imageRoutes.get);

   app.get('/(:user)/live-visuals/(:event)/participate', userRoutes.participateAtUserEvent);
   app.get('/(:user)/live-visuals/(:event)', userRoutes.getUserEvent);
   app.get('/(:user)/performances/(:performance)', userRoutes.getUserPerformance);
   app.get('/(:user)/tvshows/(:tvshow)', userRoutes.getUserTvshow);

   app.get('/(:user)/playlists/(:playlist)', userRoutes.getUserPlaylist);
   app.get('/(:user)/footage/(:footage)', userRoutes.getUserFootage);
   app.get('/(:user)/galleries/(:gallery)', userRoutes.getUserGallery);
   //app.get('/(:user)/crews/(:crew)', userRoutes.getUserCrew);

   app.get('/(:user)/events', userRoutes.getUserEvents);
   app.get('/(:user)/performances', userRoutes.getUserPerformances);
   app.get('/(:user)/tvshows',  userRoutes.getUserTvshows);
   app.get('/(:user)/playlists', userRoutes.getUserPlaylists);
   app.get('/(:user)/footage', userRoutes.getUserFootages);
   app.get('/(:user)/galleries', userRoutes.getUserGalleries);
   app.get('/(:user)/crews', userRoutes.getUserCrews);

   app.get('/(:user)', userRoutes.getUser);
   */
};
