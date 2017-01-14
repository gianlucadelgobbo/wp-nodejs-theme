var indexRoutes = require('./routes/lcf/index');
var editionsRoutes = require('./routes/lcf/editions');

var signupRoutes = require('./routes/_common/signup');
var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');

module.exports = function(app) {
  app.get('/it/', indexRoutes.get);
  app.get('/it/team', usersRoutes.getAllPeople);
  app.get('/it/team/(:user)', usersRoutes.get);
  app.get('/it/partners', usersRoutes.getAllCustomers);
  app.get('/it/partners/(:user)', usersRoutes.get);
  app.get('/it/events/', eventsRoutes.getAll);
  app.get('/it/events/(:event)', eventsRoutes.get);
  app.get('/it/news/', newsRoutes.getAll);
  app.get('/it/news/(:new)', newsRoutes.get);
  app.get('/it/editions/', editionsRoutes.getAll);
  app.get('/it/editions/(:edition)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/it/editions/(:edition)/artists/(:artist)', editionsRoutes.getArtist);
  app.get('/it/editions/(:edition)/artists/(:artist)/performances/(:performance)', editionsRoutes.getArtist);
  app.get('/it/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)', editionsRoutes.getGallery);
  app.get('/it/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', editionsRoutes.getGallery);
  app.get('/it/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/it/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/it/gallery', pagesRoutes.getGallery);
  app.get('/it/gallery/(:artist)/(:gallery)', pagesRoutes.getGallery);
  app.get('/it/gallery/(:artist)/(:gallery)/(:galleryitem)', pagesRoutes.getGallery);
  app.get('/it/(:page)', pagesRoutes.get);

  app.get('/', indexRoutes.get);
  app.get('/team', usersRoutes.getAllPeople);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getAllCustomers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/editions/', editionsRoutes.getAll);
  app.get('/editions/(:edition)', editionsRoutes.get);
  app.get('/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/artists/(:artist)', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/artists/(:artist)/performances/(:performance)', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)', editionsRoutes.getGallery);
  app.get('/editions/(:edition)/gallery/(:artist)/gallery/(:gallery)/(:galleryitem)', editionsRoutes.getGallery);
  app.get('/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/gallery', pagesRoutes.getGallery);
  app.get('/gallery/(:artist)/(:gallery)', pagesRoutes.getGallery);
  app.get('/gallery/(:artist)/(:gallery)/(:galleryitem)', pagesRoutes.getGallery);
  //app.get('/signup', signupRoutes.get);
  app.get('/(:page)', pagesRoutes.get);

  app.post('/signup', signupRoutes.post);
  app.get('*', pagesRoutes.get404);
};
