var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler')

var i18n = require('i18n');
i18n.configure({
  locales: config.locales,
  defaultLocale: config.default_lang,
  cookie: config.prefix,
  directory: config.root + '/locales/'+config.prefix,
  register: global
});


//global.i18n = i18n;

module.exports = function(app, exp) {

  var env = process.env.NODE_ENV || 'development';
  app.set('views', [app.root + '/app/views']);
  app.set('view engine', 'pug');
  //app.set('view options', { layout: false });
  app.use(session({ secret: 'wp-nodejs-theme', resave: false, saveUninitialized: true, cookie: { secure: false, maxAge: 3600000 } }));
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(cookieParser());
  //app.use(methodOverride());
  app.use(i18n.init);
  //console.log("env "+env);
  if (env == 'production') {
    //console.log("env "+env);
    app.set('view cache', true);
    //app.set('view options', { doctype : 'html', pretty : true });
  } else {
    app.locals.pretty = true;
    var stylus = require('stylus');
    var nib = require('nib');
    app.use(stylus.middleware({ src: app.root + '/public', compile:function (str, path) {
      return stylus(str)
          .set('filename', path)
          .set('compress', true)
          .use(nib())
          .import('nib');
    } }));
    var logger = require('morgan');
    app.use(logger('combined'));
    app.use(errorhandler());
    app.use(function(err, req, res, next) {
      // Do logging and user-friendly error message display
      console.error(err);
      res.status(500).send({status:500, message: 'internal error', type:'internal'});
    })/**/
  }
  app.use(exp.static(app.root + '/public'));
  app.use(exp.static(app.root + '/files'));
};