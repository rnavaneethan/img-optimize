const gulp = require('gulp'),
  del = require('del'),
  $ = require('gulp-load-plugins')(); //load all gulp plugins

/*customizable config*/
const width = 1024,
  height = 1024,
  quality = 0.75;

/*Dir setup*/
const SRC= './in/*.{jpg,jpeg,JPG,JPEG}',
  DEST = './out/';

gulp.task('clean', function() {
  return del(DEST + '/**/*'); //delete all destination files, just to be clean
});
gulp.task('default', ['clean'], function() {
  // place code here
  return gulp.src(SRC)
    .pipe($.plumber())  //node stream related error handling
    .pipe($.changed(DEST))
    .pipe($.imageResize({
      'width': width,
      'height': height,
      'crop': false,
      'autoOrient': true,
      'overwrite': false,
      'upscale': false,
      'quality': quality
    }))
    .pipe($.imagemin({
      progressive: true,
      optimizationLevel: 7,
      cache: false
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(DEST));
});
