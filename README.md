[![Known Vulnerabilities](https://snyk.io/test/github/rnavaneethan/img-optimize/badge.svg)](https://snyk.io/test/github/rnavaneethan/img-optimize) [![Build Status](https://travis-ci.org/rnavaneethan/img-optimize.svg?branch=master)](https://travis-ci.org/rnavaneethan/img-optimize) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/rnavaneethan/img-optimize/master/LICENSE) [![dependencies Status](https://david-dm.org/rnavaneethan/img-optimize/status.svg)](https://david-dm.org/rnavaneethan/img-optimize) [![devDependencies Status](https://david-dm.org/rnavaneethan/img-optimize/dev-status.svg)](https://david-dm.org/rnavaneethan/img-optimize?type=dev)

# imgoptimize
Gulp wrapper to resize and optimize images for the web

## Features
* Resize and reduce bigger images
* Reduce image quality
* Create optimized WebP format (disabled by default)
* Add watermark to the images 

## Setup
This code is built based on gulp and various gulp plug-ins to resize and optimize images.
### Pre-requisites
You need node, npm & gulp globalling installed in your machine.

[Download NodeJS](https://nodejs.org/en/download/)

[Install Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Install
* Download the code from github
~~~~~
git clone https://github.com/rnavaneethan/img-optimize.git
cd img-optimize
yarn
~~~~~
Now you are ready.

## How To
* Create a directory 'in' and place/paste all the images that needs to be converted.
* Run 'gulp' command.
* Optimized and minified image will be available with same name in 'out' directory.

### Advanced Usage
Creating WebP image, dimension to resize etc., are configurable. Default values are provided in [config.json.tmpl](config.json.tmpl). Copy this file and rename it to 'config.json' and make required changes. Next run will pick up the updated configuration changes. 
## Notes
* By default, images are resized to 1024 px in width/height and aspect ratio is kept intact.
* GraphicsMagick & ImageMagick are required for image resizing. Please check your platform documentation/[gulp-image-resize](https://github.com/scalableminds/gulp-image-resize) for more info. 

## Various image manipulation plug-ins used (Big Thanks to...)
* [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
* [gulp-image-resize](https://github.com/scalableminds/gulp-image-resize)
* [gulp-watermark](https://github.com/HAKASHUN/gulp-watermark)
* [gulp-webp](https://github.com/sindresorhus/gulp-webp)
* [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg)

