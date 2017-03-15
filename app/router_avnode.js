var indexRoutes = require('./routes/avnode/index');
var activitiesRoutes = require('./routes/avnode/activities');

var sitemapRoutes = require('./routes/_common/sitemap');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');
var robotsRoutes = require('./routes/_common/robots');

module.exports = function(app) {
  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});

  app.get('/*.php', pagesRoutes.get404);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-activities-(:activity).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  /*app.get('/it/', indexRoutes.get);
  app.get('/it/members', usersRoutes.getUsers);
  app.get('/it/members/(:user)', usersRoutes.get);
  app.get('/it/partners', usersRoutes.getUsers);
  app.get('/it/partners/(:user)', usersRoutes.get);
  app.get('/it/events/', eventsRoutes.getAll);
  app.get('/it/events/(:event)', eventsRoutes.get);
  app.get('/it/news/', newsRoutes.getAll);
  app.get('/it/news/(:news)', newsRoutes.get);
  app.get('/it/activities/', activitiesRoutes.getAll);
  app.get('/it/activities/(:activity)', activitiesRoutes.get);
  app.get('/it/(:page)/', pagesRoutes.get);
*/
  app.get('/', indexRoutes.get);
  app.get('/members', usersRoutes.getUsers);
  app.get('/members/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/events/page/(:page)', newsRoutes.getAll);
  app.get('/activities/', activitiesRoutes.getAll);
  app.get('/activities/(:activity)', activitiesRoutes.get);
  app.get('/activities/page/(:page)', activitiesRoutes.getAll);

  app.get('/(:page)', pagesRoutes.get);
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);

  /*
  app.get('/activities/(:activity)/artists', activitiesRoutes.getArtist);
  app.get('/activities/(:activity)/artists/(:artist)/performances/(:performance)', activitiesRoutes.getArtist);
  app.get('/activities/(:activity)/artists/(:artist)', activitiesRoutes.getArtist);
   app.get('/activities/(:activity)/gallery/(:artist)/gallery/(:gallery)', activitiesRoutes.getGallery);
   app.get('/activities/(:activity)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', activitiesRoutes.getGallery);
   app.get('/activities/(:activity)/(:subactivity)', activitiesRoutes.get);
   app.get('/activities/(:activity)/(:subactivity)/(:subsubactivity)', activitiesRoutes.get);
   */
};
