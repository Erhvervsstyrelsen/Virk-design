'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');

var config = {
     nodeModulesDir: './node_modules' 
}

// SRC and DIST paths
var paths = {
  srcFolder: './src/',
  distFolder: './dist/'
};

// handlebars task
gulp.task('handlebars', function () {
  var options = {
  	ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch : [paths.srcFolder + '/examples/partials']
  }

  return gulp.src(paths.srcFolder + '/examples/*.hbs')
  .pipe(handlebars(null, options))
  .pipe(rename({ extname: '.html' }))
  .pipe(gulp.dest(paths.distFolder + '/examples'))
});

// CSS task
gulp.task('css', function () {
  gulp.src(paths.srcFolder + '/scss/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.distFolder + '/css'))
		.pipe(cssnano())
		// Minified version
		.pipe(rename({ extname: '.min.css' }))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(paths.distFolder + '/css'))
    .pipe(livereload());
});

// JS task
gulp.task('js', function () {
	return gulp.src(paths.srcFolder + '/js/*.js')
  .pipe(gulp.dest(paths.distFolder + '/js'));
});

// Fonts task
gulp.task('fonts', function () {
	return gulp.src(paths.srcFolder + '/fonts/*.*')
  .pipe(gulp.dest(paths.distFolder + '/fonts'));
});

gulp.task('glyphicons', function () {
	return gulp.src(paths.srcFolder + '/fonts/bootstrap/*.*')
  .pipe(gulp.dest(paths.distFolder + '/fonts/bootstrap'));
});

// Graphics task
gulp.task('graphics', function () {
  return gulp.src(paths.srcFolder + '/graphics/*.{png,jpg,gif,svg}')
  .pipe(imagemin({
    optimizationLevel: 7,
    progressive: true
  }))
  .pipe(gulp.dest(paths.distFolder + '/graphics'))
});

// Watch task
gulp.task('watch', function () {
	gulp.watch(paths.srcFolder + '/examples/*.hbs', ['handlebars']);
	gulp.watch(paths.srcFolder + '/examples/*/*.hbs', ['handlebars']);
	gulp.watch(paths.srcFolder + '/examples/*/*/*.hbs', ['handlebars']);
	gulp.watch(paths.srcFolder + '/examples/*/*/*/*.hbs', ['handlebars']);
  gulp.watch(paths.srcFolder + '/scss/*.scss', ['css']);
	gulp.watch(paths.srcFolder + '/scss/*/*.scss', ['css']);
	gulp.watch(paths.srcFolder + '/js/*.js', ['js']);
  gulp.watch(paths.srcFolder + '/graphics/*.{png,jpg,gif,svg}', ['graphics']);
});

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('default', ['handlebars', 'css', 'js', 'graphics', 'fonts', 'glyphicons', 'watch']);
