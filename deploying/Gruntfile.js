module.exports = function(grunt) {
	// Your tasks go here!
	grunt.config.init({
		copyFiles: {
			options: {
				workingDirectory: 'working',
				manifest: [
					'index.html', 'stylesheets/style.css', 'javascripts/app.js'
				]
			}
		},
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('createFolder', 'Create the working folder', function() {
		var workingDirectory;

		grunt.config.requires('copyFiles.options.workingDirectory');
		workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

		grunt.log.writeln('Creating ' + workingDirectory);
		grunt.file.mkdir(workingDirectory);
	});

	grunt.registerTask('clean', 'Deletes the working folder and its contents', function() {
		var workingDirectory;

		grunt.config.requires('copyFiles.options.workingDirectory');
		workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

		grunt.log.writeln('Cleaning ' + workingDirectory);
		grunt.file.delete(grunt.config.get('copyFiles.options.workingDirectory'));
	});

	grunt.registerTask('copyFiles', function() {
		var files, workingDirectory;

		grunt.config.requires('copyFiles.options.manifest');
		grunt.config.requires('copyFiles.options.workingDirectory');

		files = grunt.config.get('copyFiles.options.manifest');
		workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

		files.forEach(function(file) {
			var destination = workingDirectory + '/' + file;
			grunt.log.writeln('Copying ' + file + ' to ' + destination);
			grunt.file.copy(file, destination); 
		});
	});

	grunt.registerTask('copyFilesRecursive', function() {
		var files, workingDirectory;

		grunt.config.requires('copyFiles.options.manifest');
		grunt.config.requires('copyFiles.options.workingDirectory');

		files = grunt.config.get('copyFiles.options.manifest');
		workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

		files.forEach(function(item) {
			recursiveCopy(item, workingDirectory);
		});

		var content = '<%=pkg.name %> version <%= pkg.version %>';
		content = grunt.template.process(content);
		grunt.file.write(workingDirectory + '/version.txt', content);
	});

	grunt.registerTask('deploy', 'Deploy files', ['clean', 'createFolder', 'copyFilesRecursive']);

	var recursiveCopy = function(source, destination) {
		if(grunt.file.isDir(source)) {
			grunt.file.recurse(source, function(file) {
				recursiveCopy(file, destination);
			});

		} else {
			grunt.log.writeln('Copying ' + source + ' to ' + destination);
			grunt.file.copy(source, destination + '/' + source); 
		}
	}
}
