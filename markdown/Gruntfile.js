module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.config('coffee', {
		app: {
			options: {
				bare: false
			},
			files: {
				'tmp/compiled.js': ['coffeescript/app.coffee', 
														'coffeescript/factories/*.coffee', 
														'coffeescript/controllers/*.coffee']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.config('concat',{
		scripts: {
			src: ['bower_components/angular/angular.js', 
			      'bower_components/angular-sanitize/angular-sanitize.js', 
			      'bower_components/markdown/dist/markdown.js', 
			      'tmp/compiled.js'],
			dest: 'tmp/app.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.config('uglify', {
		sctipts: {
			files: {
				'assets/app.js' : 'tmp/app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.config('sass', {
		app: {
			files: {
				'tmp/app.css': ['sass/style.scss']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.config('cssmin', {
		app: {
			files: {
				'assets/app.css': ['tmp/app.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		scripts: {
			files: ['coffeescript/**/*.coffee'],
			tasks: ['coffee', 'concat:scripts', 'uglify'],

			options: {
				spawn: false
			}
		},
		styles: {
			files: ['sass/**/*.scss'],
			tasks: ['sass', 'cssmin'],
			options: {
				spawn: false
			}
		},
		interface: {
			files: ['index.html']
		},
		options: {
			livereload: true
		}		
	});



	grunt.registerTask('build', "Builds the application.", 
										['coffee', 'concat:scripts', 'sass', 'cssmin', 'uglify' ]);
};
