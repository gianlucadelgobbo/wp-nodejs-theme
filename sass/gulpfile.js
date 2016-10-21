var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
	bowerDir: '../bower_components',
	publicDir: '../public/lpm',
};

gulp.task('css_bs', function() {
	return gulp.src('./*.scss')
		.pipe(sass({
			style: 'compressed',
			includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
		}))
		.pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts_bs', function() {
	return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/**/*')
		.pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js_bs', function() {
	return gulp.src(config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
		.pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('js_jq', function() {
	return gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
		.pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('default', ['css_bs', 'js_bs', 'fonts_bs', 'js_jq']);