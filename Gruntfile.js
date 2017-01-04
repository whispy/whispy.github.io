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
    },
    postcss: {
      app: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 3 versions'}),
            require('postcss-flexibility')
          ]
        },
        src: 'app_templates/skin_1/css/main.css',
        dest: 'app_templates/skin_1/css/main.css'
      },
      landing: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 3 versions'}),
            require('postcss-flexibility')
          ]
        },
        src: 'app_templates/skin_1/landing/css/landing.css',
        dest: 'app_templates/skin_1/landing/css/landing.css'
      },
      checkout: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 3 versions'}),
            require('postcss-flexibility')
          ]
        },
        src: 'app_templates/skin_1/checkout/css/checkout.css',
        dest: 'app_templates/skin_1/checkout/css/checkout.css'
      }
    },
	})

  grunt.registerTask('default', ['includereplace','newer:imagemin']);
};