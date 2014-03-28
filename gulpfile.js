var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    connect = require('gulp-connect'),
    server = lr();


// fileinclude: grab partials and render single html file
// ==========================================
gulp.task('fileinclude', function() {
  return  gulp.src(['./templates/index.tpl.html'])
    .pipe(rename("index.html"))
    .pipe(fileinclude())
    .pipe(gulp.dest('./'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Includes: included' }));
});

//  Sass: compile sass to css task
//===========================================
gulp.task('sass', function() {
  return gulp.src('css/source/app.scss')
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(gulp.dest('css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'SO Sassy!' }));
});


//  Connect: sever task
//===========================================
gulp.task('connect', connect.server({
  port: 1337,
  root: [__dirname],
  livereload: false
}));


//  Watch and Livereload
//===========================================
gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.error(err) 
      //TODO use notify to log a message on Sass compile fail and Beep
    };

    //Watch task for sass
    gulp.watch('css/source/**/*.scss', ['sass']);

    // watch task for gulp-includes
    gulp.watch('templates/**/*.html', ['fileinclude']);

  });

});


//  Default Gulp Task
//===========================================
gulp.task('default', ['fileinclude', 'sass', 'connect', 'watch'], function() {

});



