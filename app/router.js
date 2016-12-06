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
	app.get('/it/web-and-mobile/', webRoutes.getAll);
	app.get('/it/web-and-mobile/(:web)', webRoutes.get);
	app.get('/it/videos/', videosRoutes.getAll);
	app.get('/it/videos/(:video)', videosRoutes.get);
	app.get('/it/events/', eventsRoutes.getAll);
	app.get('/it/events/(:event)', eventsRoutes.get);
	app.get('/it/learning/', learningRoutes.getAll);
	app.get('/it/learning/(:learning)', learningRoutes.get);
	app.get('/it/lab/', labRoutes.getAll);
	app.get('/it/lab/(:lab)', labRoutes.get);
	app.get('/it/extra/', newsRoutes.getAll);
	app.get('/it/extra/(:news)', newsRoutes.get);
	app.get('/it/people', usersRoutes.getAll);
	app.get('/it/people/(:user)', usersRoutes.get);
	app.get('/it/customers', usersRoutes.getAll);
	app.get('/it/customers/(:user)', awardsRoutes.get);
	app.get('/it/awards-and-grants/', awardsRoutes.getAll);
	app.get('/it/awards-and-grants/(:award)', newsRoutes.get);
	app.get('/it/(:page)/', pagesRoutes.get);

	app.get('/', indexRoutes.get);
	app.get('/web-and-mobile/', webRoutes.getAll);
	app.get('/web-and-mobile/(:web)', webRoutes.get);
	app.get('/videos/', videosRoutes.getAll);
	app.get('/videos/(:video)', videosRoutes.get);
	app.get('/events/', eventsRoutes.getAll);
	app.get('/events/(:event)', eventsRoutes.get);
	app.get('/learning/', learningRoutes.getAll);
	app.get('/learning/(:learning)', learningRoutes.get);
	app.get('/lab/', labRoutes.getAll);
	app.get('/lab/(:lab)', labRoutes.get);
	app.get('/extra/', newsRoutes.getAll);
	app.get('/extra/(:news)', newsRoutes.get);
	app.get('/people', usersRoutes.getAll);
	app.get('/people/(:user)', usersRoutes.get);
	app.get('/customers', usersRoutes.getAll);
	app.get('/customers/(:user)', awardsRoutes.get);
	app.get('/awards-and-grants/', awardsRoutes.getAll);
	app.get('/awards-and-grants/(:award)', newsRoutes.get);
	app.get('/(:page)/', pagesRoutes.get);

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
