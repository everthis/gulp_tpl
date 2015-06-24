'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/**/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/**/*.css'),
    path.join(conf.paths.src, '/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
      console.log('css');
    } else {
      gulp.start('inject');
      console.log('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
      console.log('scripts');
    } else {
      gulp.start('inject');
      console.log('inject');
    }
  });

  gulp.watch(path.join(conf.paths.tmp, '/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
