var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

var config = {
  bowerDir: '../bower_components',
  publicDir: '../public',
};

var tasklist = [
  'css_avnode_bs',
  'css_chromosphere_bs',
  'css_flyer_bs',
  'css_lcf_bs',
  'css_linuxclub_bs',
  'css_lpm_bs',
  'css_shockart_bs',
  'css_vjtelevision_bs',
  'css_wam_bs',
  'js_bs',
  'fonts_bs',
  'js_jq',
  'compress_js_common',
  'compress_js_avnode',
  'compress_js_chromosphere',
  'compress_js_flyer',
  'compress_js_lcf',
  'compress_js_linuxclub',
  'compress_js_lpm',
  'compress_js_shockart',
  'compress_js_vjtelevision',
  'compress_js_wam',
  'concat_common_scripts',
  'concat_avnode_css',
  'concat_chromosphere_css',
  'concat_flyer_css',
  'concat_lcf_css',
  'concat_linuxclub_css',
  'concat_lpm_css',
  'concat_shockart_css',
  'concat_vjtelevision_css',
  'concat_wam_css'
];
var editions_lpm = [
  '2004-rome',
  '2005-rome',
  '2006-rome',
  '2007-rome',
  '2008-mex',
  '2008-rome',
  '2009-rome',
  '2010-rome',
  '2011-minsk',
  '2011-rome',
  '2012-rome',
  '2013-cape-town',
  '2013-mex',
  '2013-rome',
  '2014-eindhoven',
  '2015-rome',
  '2016-amsterdam',
  '2017-amsterdam'
];
var excludeXL = [
  '2011-minsk',
  '2011-rome',
  '2010-rome',
  '2009-rome',
  '2008-rome',
  '2008-mex',
  '2007-rome',
  '2006-rome',
  '2005-rome',
  '2004-rome'
];
var editions_lcf = [
  '2014-rome',
  '2015-rome',
  '2016-rome',
  '2017-rome'
];

var editions_chromosphere = [
  'nye-2016-rome'
];


gulp.task('css_avnode_bs', function() {
  return gulp.src('./avnode/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/avnode/css'));
});

gulp.task('css_chromosphere_bs', function() {
  return gulp.src('./chromosphere/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/chromosphere/css'));
});

gulp.task('css_flyer_bs', function() {
  return gulp.src('./flyer/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/flyer/css'));
});

gulp.task('css_lcf_bs', function() {
  return gulp.src('./lcf/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/lcf/css'));
});

gulp.task('css_linuxclub_bs', function() {
  return gulp.src('./linuxclub/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/linuxclub/css'));
});

gulp.task('css_lpm_bs', function() {
  return gulp.src('./lpm/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/lpm/css'));
});

gulp.task('css_shockart_bs', function() {
  return gulp.src('./shockart/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/shockart/css'));
});

gulp.task('css_vjtelevision_bs', function() {
  return gulp.src('./vjtelevision/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/vjtelevision/css'));
});

gulp.task('css_wam_bs', function() {
  return gulp.src('./wam/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/wam/css'));
});


gulp.task('js_bs', function() {
  return gulp.src(config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest(config.publicDir + '/_common/js'));
});

gulp.task('fonts_bs', function() {
  return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest(config.publicDir + '/_common/fonts'));
});

gulp.task('js_jq', function() {
  return gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(config.publicDir + '/_common/js'));
});

gulp.task('compress_js_common', function() {
  gulp.src(['!'+config.publicDir + '/_common/js/*.min.js',config.publicDir + '/_common/js/*.js'])
      .pipe(minify({
        ext:{
          min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
      }))
      .pipe(gulp.dest(config.publicDir + '/_common/js/'))
});

gulp.task('compress_js_avnode', function() {
  gulp.src(['!'+config.publicDir + '/avnode/js/*.min.js',config.publicDir + '/avnodes/js/*.js'])
      .pipe(minify({
        ext:{
          min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
      }))
      .pipe(gulp.dest(config.publicDir + '/avnode/js/'))
});

gulp.task('compress_js_chromosphere', function() {
  gulp.src(['!'+config.publicDir + '/chromosphere/js/*.min.js',config.publicDir + '/chromosphere/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/chromosphere/js/'))
});

gulp.task('compress_js_flyer', function() {
  gulp.src(['!'+config.publicDir + '/flyer/js/*.min.js',config.publicDir + '/flyer/js/*.js'])
      .pipe(minify({
        ext:{
          min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
      }))
      .pipe(gulp.dest(config.publicDir + '/flyer/js/'))
});

gulp.task('compress_js_lcf', function() {
  gulp.src(['!'+config.publicDir + '/lcf/js/*.min.js',config.publicDir + '/lcf/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/lcf/js/'))
});

gulp.task('compress_js_linuxclub', function() {
  gulp.src(['!'+config.publicDir + '/linuxclub/js/*.min.js',config.publicDir + '/linuxclubs/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/linuxclub/js/'))
});

gulp.task('compress_js_lpm', function() {
  gulp.src(['!'+config.publicDir + '/lpm/js/*.min.js',config.publicDir + '/lpm/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/lpm/js/'))
});

gulp.task('compress_js_shockart', function() {
  gulp.src(['!'+config.publicDir + '/shockart/js/*.min.js',config.publicDir + '/shockart/js/*.js'])
      .pipe(minify({
        ext:{
          min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
      }))
      .pipe(gulp.dest(config.publicDir + '/shockart/js/'))
});

gulp.task('compress_js_vjtelevision', function() {
  gulp.src(['!'+config.publicDir + '/vjtelevision/js/*.min.js',config.publicDir + '/vjtelevisions/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/vjtelevision/js/'))
});

gulp.task('compress_js_wam', function() {
  gulp.src(['!'+config.publicDir + '/wam/js/*.min.js',config.publicDir + '/wams/js/*.js'])
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/wam/js/'))
});

gulp.task('concat_common_scripts', function() {
  return gulp.src([
    config.publicDir + '/_common/js/jquery.min.js',
    config.publicDir + '/_common/js/jquery.isotope.min.js',
    config.publicDir + '/_common/js/imagesloaded.pkgd.min.js',
    config.publicDir + '/_common/js/cookielawinfo.min.js',
    config.publicDir + '/_common/js/bootstrap.min.js',
    config.publicDir + '/_common/js/script.min.js'
  ])
      .pipe(concat('combo.min.js'))
      .pipe(gulp.dest(config.publicDir + '/_common/js/'));
});

gulp.task('concat_avnode_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/avnode/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/avnode/css/style.css'
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/avnode/css/'));
});

gulp.task('concat_chromosphere_css', function() {
  for (var item in editions_chromosphere) {
    var csslist = [
      config.publicDir + '/_common/css/fontello.css',
      config.publicDir + '/_common/css/fontello-animation.css',
      config.publicDir + '/_common/css/socialGalleryPluginLite.css',
      config.publicDir + '/_common/css/cookielawinfo.css',
      config.publicDir + '/chromosphere/css/bootstrap.min.chromosphere.' + editions_chromosphere[item] + '.css',
      config.publicDir + '/_common/css/style.css',
      config.publicDir + '/chromosphere/css/style.chromosphere.css',
      config.publicDir + '/chromosphere/css/style.chromosphere.' + editions_chromosphere[item] + '.css',
    ];
    csslist.push(config.publicDir + '/_common/css/bootstrapXL.css');
    bella_chromosphere(csslist,editions_chromosphere,item);

  }
});

gulp.task('concat_flyer_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/flyer/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/flyer/css/style.css'
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/flyer/css/'));
});

gulp.task('concat_lcf_css', function() {
  for (var item in editions_lcf) {
    var csslist = [
      config.publicDir + '/_common/css/fontello.css',
      config.publicDir + '/_common/css/fontello-animation.css',
      config.publicDir + '/_common/css/socialGalleryPluginLite.css',
      config.publicDir + '/_common/css/cookielawinfo.css',
      config.publicDir + '/lcf/css/bootstrap.min.lcf.' + editions_lcf[item] + '.css',
      config.publicDir + '/_common/css/style.css',
      config.publicDir + '/lcf/css/style.lcf.css',
      config.publicDir + '/lcf/css/style.lcf.' + editions_lcf[item] + '.css',
    ];
    csslist.push(config.publicDir + '/_common/css/bootstrapXL.css');
    bella_lcf(csslist,editions_lcf,item);

  }
});

gulp.task('concat_linuxclub_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/linuxclub/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/linuxclub/css/style.css'
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/linuxclub/css/'));
});

gulp.task('concat_lpm_css', function() {
  for (var item in editions_lpm) {
    var csslist = [
      config.publicDir + '/_common/css/fontello.css',
      config.publicDir + '/_common/css/fontello-animation.css',
      config.publicDir + '/_common/css/socialGalleryPluginLite.css',
      config.publicDir + '/_common/css/cookielawinfo.css',
      config.publicDir + '/lpm/css/bootstrap.min.lpm.' + editions_lpm[item] + '.css',
      config.publicDir + '/_common/css/style.css',
      config.publicDir + '/lpm/css/style.lpm.css',
      config.publicDir + '/lpm/css/style.lpm.' + editions_lpm[item] + '.css',
    ];
    if (excludeXL.indexOf(editions_lpm[item]) == -1) csslist.push(config.publicDir + '/_common/css/bootstrapXL.css');
    bella_lpm(csslist,editions_lpm,item);

  }
});

gulp.task('concat_shockart_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/shockart/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/shockart/css/style.css',
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/shockart/css/'));
});

gulp.task('concat_vjtelevision_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/vjtelevision/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/vjtelevision/css/style.css'
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/vjtelevision/css/'));
});

gulp.task('concat_wam_css', function() {
  return gulp.src([
    config.publicDir + '/_common/css/fontello.css',
    config.publicDir + '/_common/css/fontello-animation.css',
    config.publicDir + '/_common/css/socialGalleryPluginLite.css',
    config.publicDir + '/_common/css/cookielawinfo.css',
    config.publicDir + '/wam/css/bootstrap.min.css',
    config.publicDir + '/_common/css/bootstrapXL.css',
    config.publicDir + '/_common/css/style.css',
    config.publicDir + '/wam/css/style.css'
  ])
    .pipe(concat('combo.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/wam/css/'));
});

function bella_lpm (csslist,editions_lpm,item){
  return gulp.src(csslist)
    .pipe(concat('combo.lpm.' + editions_lpm[item] + '.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/lpm/css/'));
}
function bella_lcf (csslist,editions_lcf,item){
  return gulp.src(csslist)
    .pipe(concat('combo.lcf.' + editions_lcf[item] + '.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/lcf/css/'));
}
function bella_chromosphere (csslist,editions_chromosphere,item){
  return gulp.src(csslist)
    .pipe(concat('combo.chromosphere.' + editions_chromosphere[item] + '.min.css'), {newLine: '\r\n'})
    .pipe(gulp.dest(config.publicDir + '/chromosphere/css/'));
}
gulp.task('default', tasklist);