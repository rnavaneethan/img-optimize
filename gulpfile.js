/*Gulp JS code*/
const gulp = require('gulp'),
  del = require('del'),
  imageminMozjpeg = require('imagemin-mozjpeg'),
  parallel = require('concurrent-transform'),
  combiner = require('stream-combiner2'),
  filesize = require('filesize'),
  os = require("os"),
  $ = require('gulp-load-plugins')(), //load all gulp plugins
  defConfig = {
    'in_dir': './in',
    'out_dir': './out',
    'width': 1024,
    'height': 1024,
    'quality': 0.75,
    'createWebP': false,
    'watermark': './watermark.png'
  },
  userConfig = {};

let config = {};
Object.assign(config, defConfig, userConfig);

let SRC = config.in_dir + '/**/*.{jpg,jpeg,png,svg,gif}',
  DEST = config.out_dir;

/*image processing pipeline
  - Resize the image.
  - Minify the image with imagemin
  - Mozjpeg compression is used for jpg files
*/
const processImages = combiner.obj(
  $.imageResize({
    'width': config.width,
    'height': config.height,
    'crop': false,
    'autoOrient': true,
    'overwrite': false,
    'upscale': false,
    'quality': config.quality
  }),
  $.imagemin({
    progressive: true,
    optimizationLevel: 7,
    cache: false,
    use: [imageminMozjpeg()]
  }),
  $.watermark({
    'image': config.watermark,
    'resize': '100x100'
  })
);

gulp.task('clean', () => {
  return del(config.out_dir + '/**/*'); //delete all destination files, just to be clean
});
gulp.task('default', () => {
  // place code here
  return gulp.src(SRC, {nocase:true, base: config.in_dir})
    .pipe($.plumber())  //node stream related error handling
    .pipe($.changed(DEST))
    .pipe($.sizediff.start())
    .pipe(parallel(processImages,os.cpus().length))
    .pipe(gulp.dest(DEST))
    .pipe(config.createWebP ? $.webp() : $.util.noop())
    .pipe(gulp.dest(DEST))
    .pipe($.sizediff.stop({
      'title': 'Saved',
      formatFn: (data) => {
        return filesize(data.diff) + ' (' + (100 - Math.round((data.diffPercent||1) * 100))  + '%)';
      }
    }))
    .pipe($.plumber.stop());
});
