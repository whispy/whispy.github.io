module.exports = function(grunt) {

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
  		}
	})

  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('default', ['includereplace']);
};