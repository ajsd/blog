/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    paths: {
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    clean: {
      dist: ['<%= paths.dist %>', '<%= paths.tmp %>']
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= paths.app %>',
          dest: '<%= paths.dist %>',
          src: [
            '*.{ico,txt}',
            'images/*',
            'fonts/*',
            'views/*'
          ]
        }]
      }
    },
    compass: {
      options: {
        require: 'compass_twitter_bootstrap',
        sassDir: '<%= paths.app %>/sass',
        relativeAssets: true
      },
      dev: {
        options: {
          environment: 'development',
          cssDir: '<%= paths.app %>/css',
          imagesDir: '<%= paths.app %>/images',
          javascriptsDir: '<%= paths.app %>/js',
          fontsDir: '<%= paths.app %>/fonts',
          outputStyle: 'compact'
        }
      },
      dist: {
        options: {
          environment: 'production',
          cssDir: '<%= paths.dist %>/css',
          imagesDir: '<%= paths.dist %>/images',
          javascriptsDir: '<%= paths.dist %>/js',
          fontsDir: '<%= paths.dist %>/fonts',
          outputStyle: 'compressed'
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= paths.dist %>/js/app.js': [
            '<%= paths.app %>/js/{,*/}*.js'
          ]
        }
      },
      options: {
        banner: '(function(){\n',
        footer: '\n})();'
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>/js',
          src: '*.js',
          dest: '<%= paths.dist %>/js'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= paths.dist %>/js/app.js': [
            '<%= paths.dist %>/js/app.js'
          ]
        }
      },
      options: {
        banner: '<%= banner %>'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= paths.dist %>/js/{,*/}*.js',
            '<%= paths.dist %>/css/{,*/}*.css',
            '<%= paths.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= paths.app %>/*.html',
      options: {
        dest: '<%= paths.dist %>'
      }
    },
    usemin: {
      html: ['<%= paths.dist %>/{,*/}*.html'],
      css: ['<%= paths.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= paths.tmp %>', '<%= paths.dist %>']
      }
    },
    usereplace: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>',
          src: '*.html',
          dest: '<%= paths.dist %>'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          //removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= paths.dist %>'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['<%= paths.app %>/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      css: {
      files: '<%= paths.app %>/sass/**/*.scss',
      tasks: ['compass:dev']
    },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadTasks('./tasks');

  // Default task.
  grunt.registerTask('default', [
    'clean',
    //'jshint',
    'copy',
    'compass:dist',
    'useminPrepare',
    'usereplace',
    'concat',
    'ngmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('dev', ['compass:dev', 'watch']);
};
