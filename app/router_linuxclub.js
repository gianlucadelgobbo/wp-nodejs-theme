var indexRoutes = require('./routes/shockart/index');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var exhibitionsRoutes = require('./routes/shockart/exhibitions');
var pagesRoutes = require('./routes/_common/pages');

module.exports = function(app) {
  app.get('/', indexRoutes.get);
  app.get('/backstage', usersRoutes.getUsers);
  app.get('/backstage/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/(:news)', newsRoutes.get);
  app.get('/exhibitions/', exhibitionsRoutes.getAll);
  app.get('/exhibitions/(:exhibition)', exhibitionsRoutes.get);
  /*
  app.get('/exhibitions/(:exhibition)/artists', exhibitionsRoutes.getArtist);
  app.get('/exhibitions/(:exhibition)/artists/(:artist)/performances/(:performance)', exhibitionsRoutes.getArtist);
  app.get('/exhibitions/(:exhibition)/gallery/(:artist)/gallery/(:gallery)', exhibitionsRoutes.getGallery);
  app.get('/exhibitions/(:exhibition)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', exhibitionsRoutes.getGallery);
  app.get('/exhibitions/(:exhibition)/artists/(:artist)', exhibitionsRoutes.getArtist);
  app.get('/exhibitions/(:exhibition)/(:subexhibition)', exhibitionsRoutes.get);
  app.get('/exhibitions/(:exhibition)/(:subexhibition)/(:subsubexhibition)', exhibitionsRoutes.get);
   */
  app.get('/(:page)/', pagesRoutes.get);
  app.get('*', pagesRoutes.get404);
};
