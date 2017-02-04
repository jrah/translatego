var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minify      = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');


// var
var cssDirectory = '/css';
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        open: false
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
             './bower_components/mathsass/dist/',
             './bower_components/madsauce/',
             './bower_components/madsauce/madsauce-css',
             './bower_components/madsauce/css/',
             './bower_components/susy/sass/'


         ]
       }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('build-js', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
  gulp.src('css/*.css')
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(csso({
         restructure: false,
         sourceMap: true,
         debug: true
       }))
      .pipe(gulp.dest('dist'));
});


gulp.task('default', ['serve']);
gulp.task('build', ['build-js', 'build-css']);
