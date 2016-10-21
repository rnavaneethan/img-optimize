[![Known Vulnerabilities](https://snyk.io/test/github/rnavaneethan/img-optimize/badge.svg)](https://snyk.io/test/github/rnavaneethan/img-optimize)

# imgoptimize
Gulp wrapper to resize and optimize images

##Example
* Create a directory 'in' and place all the images.
* Run 'gulp' command.
* Optimized and minified image will be available with same name in 'out' directory.

###Notes
* By default, image size are reduced to 1024 px in width/height and aspect ratio is kept intact.
* GraphicsMagick & ImageMagick are required for imageresizing. Please check your platform documentation/gulp-image-resize for more info.
