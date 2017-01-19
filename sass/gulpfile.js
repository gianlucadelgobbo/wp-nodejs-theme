var gulp = require('gulp');
var sass = require('gulp-sass');

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

gulp.task('default', ['css_lpm_bs', 'css_flyer_bs', 'css_shockart_bs', 'css_avnode_bs', 'js_bs', 'fonts_bs', 'js_jq']);