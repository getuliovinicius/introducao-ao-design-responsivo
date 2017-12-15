// gulpfile.js

'use strict';
 
var gulp = require('gulp');
const notify = require("gulp-notify");
var compileCSS = require('gulp-sass');
var minifyCSS = require('gulp-clean-css') 
var minifyHTML = require('gulp-htmlmin');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('remove-dist', function() {
	del('./dist');
});

gulp.task('css', function() {
	return gulp.src('./source/scss/style.scss')
		.pipe(compileCSS())
		.on('error', notify.onError({title:'erro ao compilar', message:'<%= error.message %>'}))
		.pipe(minifyCSS())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function() {
	return  gulp.src('./source/*.html')
		.pipe(minifyHTML({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist/'))
});
 
gulp.task('background', function () {
	gulp.watch('./source/scss/**/*.scss', ['css']);
	gulp.watch('./source/*.html', ['html']);
});

gulp.task('default', ['css', 'html', 'background']);