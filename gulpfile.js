const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

gulp.task('css', () => {
  return gulp.src('src/scss/app.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
});
gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['css', 'js']);



