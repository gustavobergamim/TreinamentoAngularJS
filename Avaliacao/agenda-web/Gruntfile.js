module.exports = function (grunt) {
	grunt.initConfig({
		concat: {
			js: {
				src: [
					'./_bower_content/angularjs/angular.min.js',
					'./publico/app/agenda.js',
					'./publico/app/service/dominioService.js',
					'./publico/app/service/contatoService.js',
					'./publico/app/controller/contatoController.js'
					],
				dest: './publico/app/angular.app.js'
			}
		},
		uglify: {
			options: { mangle: false },
			js: {
				files: {
					'./publico/content/main.min.js': [ 
						'./_bower_content/jquery/dist/jquery.min.js',
						'./_bower_content/bootstrap/dist/js/bootstrap.min.js',
						'./publico/app/angular.app.js'
						]
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'./publico/content/main.min.css': [
						'./_bower_content/bootstrap/dist/css/bootstrap.min.css'
						]
				}
			}
		},
		watch: {
			js: {
				files: [
					'./_bower_content/angularjs/angular.min.js',
					'./publico/app/agenda.js',
					'./publico/app/service/dominioService.js',
					'./publico/app/service/contatoService.js',
					'./publico/app/controller/contatoController.js'
					],
				tasks: [ 'concat', 'uglify' ]
			},
			css: {
				files: [
					'./_bower_content/bootstrap/dist/css/bootstrap.min.css'
					],
				tasks: [ 'cssmin' ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', [ 'concat', 'uglify', 'cssmin' ]);
	grunt.registerTask('obs', [ 'watch' ]);
};