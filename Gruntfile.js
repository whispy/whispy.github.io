module.exports = function(grunt) {

	grunt.initConfig({
		includereplace: {
			your_target: {
				options: {
				// Task-specific options go here.
      			},
      			includesDir: {
					src: 'butter*.html',
					dest: 'butterincludes/',
					expand: true,
					cwd: 'butterincludes/',
					options : {
						//The base path where includes will be resolved
						includesDir : 'butterincludes/'
					}
				},
      			files: [
      				{src: ['*.html', 'articles/*.html', 'pieces/*.html'], dest: 'dist/'}
      			]
    		}
  		}
	})

  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('default', ['includereplace']);
};