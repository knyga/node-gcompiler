##Node-gcompiler
Makes compilation of multiple JavaScript files with *google closure compiler* application.

###Requirements
Requires *nodejs* and *java*.

###How to run
`node gcompile`

###Settings.json
`basedir` - directory with JavaScript files;

`output` - output JavaScript file name;

`compiler` - path to google closure compiler;

`level` - level of optimization (WHITESPACE_ONLY, SIMPLE_OPTIMIZATIONS, ADVANCED_OPTIMIZATIONS).

###Annotating JavaScript
Node-gcompiler can use information about JavaScript file to build right compiling chain.

| Tag        | Examples           | Description  |
| ------------- |:-------------:| -----:|
| @depends     | /**\n * Describe dependencies * @depends {jquery-2.0.3.min}\n */ | $1600 |
| @compile | are neat      |    $1 |
| @name      | centered      |   $12 |

###Copyright
Oleksandr Knyga, 2014
