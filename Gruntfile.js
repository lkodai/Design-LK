module.exports = function(grunt){
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    sass: {            
      dist: {                           
        options: {                       
          style: 'compact'
        },
        files: {                         
          'app.css': 'css/source/app.scss'       
        }
      }
    },



    watch: {
      options: {
        files: ['css/**/*.css'],
        livereload: true,
      },
      sass: {
        files: 'css/source/**/*.scss',
        tasks: ['sass']
      },
      'node-sass': {
        files: 'css/source/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // task for rendering production css

  grunt.registerTask('default', ['sass']);

  //old start concurrent and liveReload
  grunt.registerTask('start', 'Live Reload Enabled', function () {
    var serverTasks = ['sass', 'concurrent:start'];
    grunt.option("force", true);
    grunt.task.run(serverTasks);
  });

};