// Load in all the Gulp plugins 
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate'),
    timeRequire=require("time-require"),
    git = require('gulp-git');;

// JSHint task, the Clean task and the default task

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});

// code for the usemin, imagemin and copyfonts tasks
gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/menu.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [ngannotate(),uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// watch and browserSync tasks
// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
    var files = [
        'app/**/*',
        'app/styles/**.css',
        'app/images/**.png',
        'app/scripts/**.js'
    ];

    browserSync.init(files, {
      server: {
        }
    });
        // Watch any files in dist/, reload on change
    gulp.watch(['app/**']).on('change', browserSync.reload);
});

// Tasks with git
// Run git add with options 
gulp.task('git-add', function(){
  return gulp.src('./{*,app/,app/styles/,app/scripts/}*.{js,json,css,html}')
    .pipe(git.add());
});
gulp.task('git-commit',['git-add'], function(){
  return gulp.src('./{*,app/,app/styles/,app/scripts/}*.{js,json,css,html}')
    .pipe(git.commit('Minor change.'));
});
gulp.task('publish',['git-commit'], function(){
  return gulp.src('./{*,app/,app/styles/,app/scripts/}*.{js,json,css,html}')
    .pipe(git.push());
});