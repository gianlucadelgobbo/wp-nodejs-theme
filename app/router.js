var indexRoutes = require('./routes/index');
var webRoutes = require('./routes/web');
var videosRoutes = require('./routes/videos');
var eventsRoutes = require('./routes/events');
var learningRoutes = require('./routes/learning');
var labRoutes = require('./routes/lab');
var newsRoutes = require('./routes/news');
var awardsRoutes = require('./routes/awards');
var usersRoutes = require('./routes/users');
var pagesRoutes = require('./routes/pages');
/*
 var searchRoutes = require('./routes/search');
 */
module.exports = function(app) {
  app.get('/it/', indexRoutes.get);
  app.get('/it/portfolio/web-and-mobile/', webRoutes.getAll);
  app.get('/it/portfolio/web-and-mobile/(:web)', webRoutes.get);
  app.get('/it/portfolio/web-and-mobile/page/(:page)', webRoutes.get);

  app.get('/it/portfolio/videos/', videosRoutes.getAll);
  app.get('/it/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/it/portfolio/videos/page/(:page)', videosRoutes.get);

  app.get('/it/portfolio/events/', eventsRoutes.getAll);
  app.get('/it/portfolio/events/(:event)', eventsRoutes.get);
  app.get('/it/portfolio/events/page/(:page)', eventsRoutes.get);

  app.get('/it/portfolio/learning/', learningRoutes.getAll);
  app.get('/it/portfolio/learning/(:learning)', learningRoutes.get);
  app.get('/it/portfolio/learning/page/(:page)', learningRoutes.get);

  app.get('/it/portfolio/lab/', labRoutes.getAll);
  app.get('/it/portfolio/lab/(:lab)', labRoutes.get);
  app.get('/it/portfolio/lab/page/(:page)', labRoutes.get);

  app.get('/it/extra/', newsRoutes.getAll);
  app.get('/it/extra/(:new)', newsRoutes.get);
  app.get('/it/extra/page/(:page)', newsRoutes.get);

  app.get('/it/portfolio/awards-and-grants/', awardsRoutes.getAll);
  app.get('/it/portfolio/awards-and-grants/(:award)', awardsRoutes.get);
  app.get('/it/portfolio/awards-and-grants/page/(:page)', awardsRoutes.get);

  app.get('/it/people', usersRoutes.getAllPeople);
  app.get('/it/people/(:user)', usersRoutes.get);
  app.get('/it/customers', usersRoutes.getAllCustomers);
  app.get('/it/customers/(:user)', usersRoutes.get);

  app.get('/it/(:page)/', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)', pagesRoutes.getSubpage);

  app.get('/', indexRoutes.get);

  app.get('/portfolio/web-and-mobile/', webRoutes.getAll);
  app.get('/portfolio/web-and-mobile/(:web)', webRoutes.get);
  app.get('/portfolio/web-and-mobile/page/(:page)', webRoutes.getAll);

  app.get('/portfolio/videos/', videosRoutes.getAll);
  app.get('/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/portfolio/videos/page/(:page)', videosRoutes.getAll);

  app.get('/portfolio/events/', eventsRoutes.getAll);
  app.get('/portfolio/events/(:event)', eventsRoutes.get);
  app.get('/portfolio/events/page/(:page)', eventsRoutes.getAll);

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

  app.get('/people', usersRoutes.getAllPeople);
  app.get('/people/(:user)', usersRoutes.get);
  app.get('/customers', usersRoutes.getAllCustomers);
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

   app.get('/events/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
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

   app.get('/(:user)/events/(:event)/participate', userRoutes.participateAtUserEvent);
   app.get('/(:user)/events/(:event)', userRoutes.getUserEvent);
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
