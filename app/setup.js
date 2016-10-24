var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var session = require('exp-session');
var methodOverride = require('method-override');

module.exports = function(app, exp) {
	var env = process.env.NODE_ENV || 'development';
	app.set('views', [app.root + '/app/views']);
	app.set('view engine', 'pug');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(methodOverride());
	app.use(exp.static(app.root + '/public'));
	//app.use(require('stylus').middleware({ src: app.root + '/public' }));
	//app.use(session({ secret: 'wp-nodejs-theme', resave: false, saveUninitialized: true, cookie: { maxAge: 3600000 } }));
	//app.use(DB.i18n.init);
	if ('development' == env) {
		app.set('view options', { doctype : 'html', pretty : true });
	}

};