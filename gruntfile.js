module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    appConfig: {
      app: '.',
      tmp: './.tmp',
      dist: './out'
    },
    clean: {
      src:[
        '<%= appConfig.tmp %>/{,*/}*',
        '<%= appConfig.dist %>/{,*/}*'
      ]
    },
    image_resize: {
      resize: {
        options: {
          width: 1024,
          height: 1024,
          crop: false,
          autoOrient: true,
          overwrite: false
        },
        cwd: '<%= appConfig.app %>',
        src: ['in/*.{jpg,jpeg,JPG,JPEG}'],
        dest: '<%= appConfig.tmp %>/'
      }
    },
    imagemin: {
      jpg: {
        options: {
          progressive: true,
          cache: false
        },
        files: [
          {
            expand:true,
            cwd: '<%= appConfig.tmp %>/',
            src: ['*.{jpg,jpeg,JPG,JPEG}'],
            dest: '<%= appConfig.dist %>/'
          }
        ]
      }
    }
  });
  grunt.registerTask('default',['clean','image_resize','imagemin']);
};
