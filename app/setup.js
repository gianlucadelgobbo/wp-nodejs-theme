//var DB = require('./server/modules/db-manager');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var session = require('exp-session');
var methodOverride = require('method-override');
var lessMiddleware = require('less-middleware');

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
	app.use(require('stylus').middleware({ src: app.root + '/public' }));
	app.use(lessMiddleware(__dirname + "/bower_components/bootstrap/less", {
		dest: __dirname + "/public/css",
		render: {
			paths: [__dirname + "/bower_components/bootstrap/less"],
		},
		// if you're using a different src/dest directory, you
		// MUST include the prefex, which matches the dest
		// public directory
		prefix: "/css",
		// force true recompiles on every request... not the
		// best for production, but fine in debug while working
		// through changes
		force: true
	}));
	app.use(exp.static(app.root + '/public'));
	//app.use(DB.i18n.init);
	//}
};