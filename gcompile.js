var exec = require('child_process').exec,
	fs = require('fs'),
	walk = require('./libs/walk'),
	settings = require('./settings');

walk(settings.basedir, '*.js', function(err, list) {

	if(list.length < 1) {
		console.log('no *.js files to compile in ' + settings.basedir);
		return;
	}

	var compCount = 0;

	var command = 'java -jar ' +
		settings.compiler +
		' --compilation_level ' +
		settings.level +
		' ';

	list.sort(function sortFunction(a, b) {

		if (a.dependencies.length > b.dependencies.length) {
			return 1;
		}

		if (a.dependencies.length < b.dependencies.length) {
			return -1;
		}

		return 0;
	});

	list.forEach(function(obj) {

		if(obj.isCompile) {
			command += '--js ' + obj.name + ' ';
			++compCount;
		}

	});

	command += '--js_output_file ' +
		settings.output;

	console.log('compiling ' + compCount + ' of ' + list.length + ' scripts')
	exec(command, function(error, stdout, stderr) {

		if (error) {
			console.log('exec error: ' + error);
		}

		// var data = fs.readFileSync(settings.output);
		// var compby = Math.round(10000*(1 - data.length/oldDataSum))/100;

		console.log(settings.output + ' created');
		//console.log('compressed by: ' + compby + '%');
	});
});