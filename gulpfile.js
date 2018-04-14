var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var gulpsync = require('gulp-sync')(gulp);
var eslint = require('gulp-eslint');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copy', function() {
  return gulp.src('./src/**')
    .pipe(gulp.dest('./dist'))
});

gulp.task('scss', function() {
  return gulp.src('./src/assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
});

gulp.task('runsync', gulpsync.sync(['clean', 'copy', 'scss', 'lint']));

gulp.task('default', ['runsync'], function() {
  gulp.watch(['src/**/*'], ['scss', 'lint'])
});
