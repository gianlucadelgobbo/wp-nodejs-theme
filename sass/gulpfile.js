var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

var config = {
  bowerDir: '../bower_components',
  publicDir: '../public',
};

gulp.task('css_lpm_bs', function() {
  return gulp.src('./lpm/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/lpm/css'));
});

gulp.task('css_flyer_bs', function() {
  return gulp.src('./flyer/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/flyer/css'));
});

gulp.task('css_shockart_bs', function() {
  return gulp.src('./shockart/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/shockart/css'));
});

gulp.task('css_avnode_bs', function() {
  return gulp.src('./avnode/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/avnode/css'));
});


gulp.task('fonts_bs', function() {
  return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest(config.publicDir + '/_common/fonts'));
});

gulp.task('js_bs', function() {
  return gulp.src(config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest(config.publicDir + '/_common/js'));
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
gulp.task('default', [
  'css_lpm_bs',
  'css_flyer_bs',
  'css_shockart_bs',
  'css_avnode_bs',
  'js_bs',
  'fonts_bs',
  'js_jq',
  'compress_js_common',
  'compress_js_avnode',
  'compress_js_lpm',
  'compress_js_flyer',
  'compress_js_shockart'
]);