var fs = require('fs');

var getDirectory = function(fullpath) {
	return fullpath.substr(0, fullpath.lastIndexOf('/') + 1);
};

var readInfo = function(file) {
	var name = file,
		altName = false,
		isCompile = true,
		dependencies = [];

	var data = fs.readFileSync(file);

	var dependencyPattern = /\@depends\s+\{(.+)\}/gi,
		namePattern = /\@name\s+\{(.+)\}/i,
		CompilePattern = /\@compile\s+\{(.+)\}/i;

	var resName = namePattern.exec(data);
	if(resName && resName.length > 0) {
		altName = resName[1];
	}

	var resCompile = CompilePattern.exec(data);
	if(resCompile && resCompile.length > 0) {
		isCompile = resCompile[1] == "false" ? false : true;
	}

	var dir = getDirectory(file);
	var result = "";
	while ((result = dependencyPattern.exec(data))) {
		dependencies.push(dir+result[1]);
	}

	return {
		name: name,
		altName: altName,
		dependencies: dependencies,
		isCompile: isCompile,
		length: data.length
	};
}

module.exports = readInfo;