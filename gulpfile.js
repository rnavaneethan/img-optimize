/*Gulp JS code*/
const gulp = require('gulp'),
  del = require('del'),
  imageminMozjpeg = require('imagemin-mozjpeg'),
  parallel = require('concurrent-transform'),
  os = require("os"),
  $ = require('gulp-load-plugins')(), //load all gulp plugins
  width = 1024, /*customizable config*/
  height = 1024,
  quality = 0.75,
  SRC = './in/*.{jpg,jpeg,JPG,JPEG}',
  DEST = './out/';
gulp.task('clean', () => {
  return del(DEST + '/**/*'); //delete all destination files, just to be clean
});
gulp.task('default', ['clean'], () => {
  // place code here
  return gulp.src(SRC)
    .pipe($.plumber())  //node stream related error handling
    .pipe($.changed(DEST))
    .pipe($.sizediff.start())
    .pipe(parallel($.imageResize({
        'width': width,
        'height': height,
        'crop': false,
        'autoOrient': true,
        'overwrite': false,
        'upscale': false,
        'quality': quality
      })
    ), os.cpus().length)
    .pipe(parallel($.imagemin({
      progressive: true,
      optimizationLevel: 7,
      cache: false,
      use: [imageminMozjpeg()]
    })), os.cpus().length)
    .pipe($.sizediff.stop())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(DEST));
});
