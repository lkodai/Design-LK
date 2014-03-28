# Generating a file per folder

If you have a set of folders, and wish to perform a set of tasks on each, for instance

    /scripts
    /scripts/jquery/*.js
    /scripts/angularjs/*.js
   
and want to end up with

    /scripts
    /scripts/jquery.min.js
    /scripts/angularjs.min.js

and so on, you need to know a little more NodeJS and event streams. 

``` javascript
var fs = require('fs');
var path = require('path');
var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var scriptsPath = './src/scripts/';

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}
 
gulp.task('scripts', function() { 
   var folders = getFolders(scriptsPath);
   
   var tasks = folders.map(function(folder) {
      // concat into foldername.js
      // write to output
      // minify
      // rename to folder.min.js
      // write to output again
      return gulp.src(path.join(scriptsPath, folder, '/*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest(scriptsPath))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(scriptsPath));
   });

   return es.concat.apply(null, tasks);
});
```

A few notes with this:

- folders.map - executes the function once per folder, and returns the async stream
- es.concat - combines the streams and ends only when all streams emitted end
- the call to .apply(null, args) is needed as es.concat expects arguments not an array
