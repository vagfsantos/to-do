var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var gulpsync = require('gulp-sync')(gulp);
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');

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
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('runsync', gulpsync.sync(['clean', 'copy', 'scss', 'lint', 'scripts']));

gulp.task('default', ['runsync'], function() {
  gulp.watch(['src/**/*'], ['scss', 'lint', 'scripts'])
});
