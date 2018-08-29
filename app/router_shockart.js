var indexRoutes = require('./routes/shockart/index');
var exhibitionsRoutes = require('./routes/shockart/exhibitions');

var sitemapRoutes = require('./routes/_common/sitemap');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');
var robotsRoutes = require('./routes/_common/robots');

module.exports = function(app) {
  app.get('/exhibitions/fotonica', exhibitionsRoutes.getFotonica);
  //app.get('/', function(req, res) {res.redirect(301, '/exhibitions/fotonica')});
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/backstage', usersRoutes.getUsers);
  app.get('/it/backstage/(:user)', usersRoutes.get);
  app.get('/it/partners', usersRoutes.getUsers);
  app.get('/it/partners/(:user)', usersRoutes.get);
  app.get('/it/events/', eventsRoutes.getAll);
  app.get('/it/events/(:event)', eventsRoutes.get);
  app.get('/it/events/page/(:page)', eventsRoutes.getAll);
  app.get('/it/news/', newsRoutes.getAll);
  app.get('/it/news/(:new)', newsRoutes.get);
  app.get('/it/news/page/(:page)', newsRoutes.getAll);
  app.get('/it/exhibitions/', exhibitionsRoutes.getAll);
  app.get('/it/exhibitions/page/(:page)', exhibitionsRoutes.getAll);
  app.get('/it/exhibitions/(:exhibition)', exhibitionsRoutes.get);
  app.get('/it/exhibitions/(:exhibition)/artists', exhibitionsRoutes.getArtist);
  app.get('/it/exhibitions/(:exhibition)/artists/(:artist)/performances/(:performance)', exhibitionsRoutes.getArtist);
  app.get('/it/exhibitions/(:exhibition)/artists/(:artist)', exhibitionsRoutes.getArtist);
  app.get('/it/(:page)/', pagesRoutes.get);
  app.post('/it/(:page)', pagesRoutes.post);

  app.get('/', indexRoutes.get);
  app.get('/backstage', usersRoutes.getUsers);
  app.get('/backstage/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/exhibitions/', exhibitionsRoutes.getAll);
  app.get('/exhibitions/page/(:page)', exhibitionsRoutes.getAll);
  app.get('/exhibitions/(:exhibition)', exhibitionsRoutes.get);
  app.get('/exhibitions/(:exhibition)/artists', exhibitionsRoutes.getArtist);
  app.get('/exhibitions/(:exhibition)/artists/(:artist)/performances/(:performance)', exhibitionsRoutes.getArtist);
  app.get('/exhibitions/(:exhibition)/artists/(:artist)', exhibitionsRoutes.getArtist);

  app.get('/(:page)/', pagesRoutes.get);
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);

  /*
  app.get('/exhibitions/(:exhibition)/gallery/(:artist)/gallery/(:gallery)', exhibitionsRoutes.getGallery);
  app.get('/exhibitions/(:exhibition)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', exhibitionsRoutes.getGallery);
  app.get('/exhibitions/(:exhibition)/(:subexhibition)', exhibitionsRoutes.get);
  app.get('/exhibitions/(:exhibition)/(:subexhibition)/(:subsubexhibition)', exhibitionsRoutes.get);
   */
};
