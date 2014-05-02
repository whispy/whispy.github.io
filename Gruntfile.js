module.exports = function(grunt) {

	grunt.initConfig({
		includereplace: {
			your_target: {
				options: {
				// Task-specific options go here.
      			},
      			includesDir: {
					src: 'test.txt',
					dest: 'includes/',
					expand: true,
					cwd: 'includes/',
					options : {
						//The base path where includes will be resolved
						includesDir : 'includes/'
					}
				},
      			files: [
      				{src: ['*.html', 'articles/*.html', 'pieces/*.html'], dest: '/'}
      			]
    		}
  		}
	})

  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('default', ['includereplace']);
};