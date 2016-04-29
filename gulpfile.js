'use strict';

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const templateCache = require('gulp-angular-templatecache');

gulp.task('serve', () => {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('html', () => {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', () => {
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('transpile', ['templates'], () => {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./app/dist"));  
});

gulp.task('templates', function () {
  return gulp.src('./templates/**/*.html')
    .pipe(templateCache({
      module: 'flexchat'
    }))
    .pipe(gulp.dest('./src/'));
});

gulp.task("default", ['sass', 'transpile'],() => {});