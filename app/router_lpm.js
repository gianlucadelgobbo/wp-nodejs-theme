var indexRoutes = require('./routes/lpm/index');
var editionsRoutes = require('./routes/lpm/editions');
var timelinemapRoutes = require('./routes/lpm/timeline-map');
var signupRoutes = require('./routes/_common/signup');


var usersRoutes = require('./routes/_common/users');
var eventsRoutes = require('./routes/_common/events');
var newsRoutes = require('./routes/_common/news');
var pagesRoutes = require('./routes/_common/pages');
/*
 var searchRoutes = require('./routes/search');
 */
module.exports = function(app) {
  app.get('/', indexRoutes.get);
  //app.get('/users', usersRoutes.getAll);
  app.get('/user/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/(:news)', newsRoutes.get);
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
  app.get('/timeline', timelinemapRoutes.getTimeline);
  app.get('/timeline/(:year)/', timelinemapRoutes.getTimeline);
  app.get('/map', timelinemapRoutes.getMap);
  //app.get('/map/(:year)/', timelinemapRoutes.getTimeline);
  //app.post('/timeline/(:year)/', pagesRoutes.postTimeline);
  app.get('/(:page)', pagesRoutes.get);
  app.post('/signup', signupRoutes.post);
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
