module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		includereplace: {
			your_target: {
				options: {
				// Task-specific options go here.
      			},
      			files: [
      				{src: ['*.html', 'writings/*.html', 'designs/*.html'], dest: './', expand: true, cwd: 'grunt-templates/'}
      			]
    		}
  		},
      imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/thumbs/',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/thumbs/'
        }]
      }
    }
	})

  grunt.registerTask('default', ['includereplace','newer:imagemin']);
};