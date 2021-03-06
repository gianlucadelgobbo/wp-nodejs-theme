var indexRoutes = require('./routes/chromosphere/index');
var editionsRoutes = require('./routes/chromosphere/editions');

var sitemapRoutes = require('./routes/_common/sitemap');
var signupRoutes = require('./routes/_common/signup');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');
var robotsRoutes = require('./routes/_common/robots');

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/event/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2016-rome/','/editions/2016-rome/'))});

  app.get('/events/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2016-rome/','/editions/2016-rome/'))});

  app.get('/edition/*', function(req, res) {res.redirect(301, req.url.replace('/edition/','/editions/'))});

  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});

  app.get('/meta/', editionsRoutes.getMeta);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-editions-(:edition).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/events/', eventsRoutes.getAll);
  app.get('/it/events/page/(:page)', eventsRoutes.getAll);
  app.get('/it/events/(:event)', eventsRoutes.get);
  app.get('/it/news/', newsRoutes.getAll);
  app.get('/it/news/page/(:page)', newsRoutes.getAll);
  app.get('/it/news/(:new)', newsRoutes.get);
  app.get('/it/team', usersRoutes.getUsers);
  app.get('/it/team/(:user)', usersRoutes.get);
  app.get('/it/partners', usersRoutes.getUsers);
  app.get('/it/partners/(:user)', usersRoutes.get);
  app.get('/it/editions/', editionsRoutes.getAll);
  app.get('/it/editions/(:edition)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/it/editions/(:edition)/artists/(:artist)', editionsRoutes.getArtist);
  app.get('/it/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);
  app.get('/it/signup', signupRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/it/(:page)', pagesRoutes.get);
  app.post('/it/signup', signupRoutes.post);
  app.post('/it/(:page)', pagesRoutes.post);

  app.get('/', indexRoutes.get);
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
  app.get('/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);
  app.get('/signup', signupRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  app.post('/signup', signupRoutes.post);
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);
};
