var exec = require('child_process').exec,
	walk = require('./libs/walk'),
	settings = require('./settings');

walk(settings.basedir, '*.js', function(err, list) {

	var command = 'java -jar ' +
		settings.compiler +
		' --compilation_level ' +
		settings.level +
		' ';

	list.forEach(function(obj) {
		command += '--js ' + obj + ' ';
	});

	command += '--js_output_file ' +
		settings.output;

	console.log('compiling ' + list.length + ' scripts')
	exec(command, function(error, stdout, stderr) {

		if(stdout) {
			console.log('stderr: ' + stdout);			
		}

		if(stderr) {
			console.log('stderr: ' + stderr);			
		}
		
		if (error) {
			console.log('exec error: ' + error);
		} else {
			console.log(settings.output + ' created');
		}

	});
});