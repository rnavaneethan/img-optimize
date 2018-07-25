/*Gulp JS code*/
const gulp = require("gulp"),
  del = require("del"),
  util = require("util"),
  exec = util.promisify(require("child_process").exec),
  imageminMozjpeg = require("imagemin-mozjpeg"),
  zopfli = require("imagemin-zopfli"),
  parallel = require("concurrent-transform"),
  combiner = require("stream-combiner2"),
  filesize = require("filesize"),
  fs = require("fs"),
  os = require("os"),
  $ = require("gulp-load-plugins")(), //load all gulp plugins
  cfg = "./config.json",
  defConfig = {
    in_dir: "./in",
    out_dir: "./out",
    width: 1024,
    height: 1024,
    createWebP: false,
    watermark: "./watermark.png"
  };

function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    if (e.code == "ENOENT") {
      // no such file or directory. File really does not exist
      //console.log("File does not exist.");
      return false;
    }

    //console.log("Exception fs.statSync (" + path + "): " + e);
    throw e; // something else went wrong, we don't have rights, ...
  }
}

let userConfig = {},
  config = {};

//Load config from config file
if (fileExists(cfg)) {
  userConfig = JSON.parse(fs.readFileSync(cfg));
}
Object.assign(config, defConfig, userConfig);

//special check for watermark file
if (config.watermark.length && !fileExists(config.watermark)) {
  //skip watermark step
  config.watermark = "";
}

let SRC = config.in_dir + "/**/*.{jpg,jpeg,png,svg,gif}",
  DEST = config.out_dir;

/*image processing pipeline
  - Resize the image.
  - Minify the image with imagemin
  - Mozjpeg compression is used for jpg files
*/
const processImages = combiner.obj(
  $.imageResize({
    width: config.width,
    height: config.height
  }),
  config.watermark.length
    ? $.watermark({
      image: config.watermark,
      resize: "100x100"
    })
    : $.util.noop(),
  $.imagemin([
    $.imagemin.gifsicle({ interlaced: true }),
    $.imagemin.jpegtran({ progressive: true }),
    $.imagemin.optipng({ optimizationLevel: 5 }),
    $.imagemin.svgo({ plugins: [{ removeViewBox: true }] }),
    imageminMozjpeg({ progressive: true }),
    zopfli({ more: true })
  ])
);

/*eslint-disable no-console */
processImages.on("error", console.error.bind(console));

/*eslint-enable no-console */

gulp.task("testGM", () => {
  //GraphicsMagick is one of the required binary/library. Check for it's presence
  return exec("gm version");
});

gulp.task("clean", () => {
  return del(config.out_dir + "/**/*"); //delete all destination files, just to be clean
});
gulp.task("processImg", () => {
  // place code here
  return gulp
    .src(SRC, { nocase: true, base: config.in_dir })
    .pipe($.plumber()) //node stream related error handling
    .pipe($.changed(DEST))
    .pipe($.sizediff.start())
    .pipe(parallel(processImages, os.cpus().length))
    .pipe(gulp.dest(DEST))
    .pipe(config.createWebP ? $.webp() : $.util.noop())
    .pipe(gulp.dest(DEST))
    .pipe(
      $.sizediff.stop({
        title: "Saved",
        formatFn: data => {
          return (
            filesize(data.diff) +
            " (" +
            (100 - Math.round((data.diffPercent || 1) * 100)) +
            "%)"
          );
        }
      })
    )
    .pipe($.plumber.stop());
});

gulp.task("default", gulp.series("testGM", "processImg"));
