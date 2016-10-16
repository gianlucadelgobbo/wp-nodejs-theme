//var DB = require('./server/modules/db-manager');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var session = require('express-session');
var methodOverride = require('method-override');

module.exports = function(app, exp) {
	//var env = process.env.NODE_ENV || 'development';
	//if ('development' == env) {
	app.set('views', [app.root + '/app/views']);
	app.set('view engine', 'pug');
	//app.set('view options', { doctype : 'html', pretty : true });
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	//app.use(session({ secret: 'wp-nodejs-theme', resave: false, saveUninitialized: true, cookie: { maxAge: 3600000 } }));
	app.use(methodOverride());
	app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
	//app.use(exp.static(global.settings.root_path + '/app/public'));
	//app.use(DB.i18n.init);
	//}
};