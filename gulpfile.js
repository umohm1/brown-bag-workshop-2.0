const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

gulp.task('css', () => {
  return gulp.src('src/scss/app.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
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
    .pipe(browserSync.stream())
});
gulp.task('serve', ['css', 'js'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/scss/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('*./html').on('change', browserSync.reload);
});

gulp.task('build', ['css', 'js']);
gulp.task('default', ['serve']);




