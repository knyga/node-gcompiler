var fs = require('fs'),
    readInfo = require('./readinfo');

var walk = function(dir, search, done) {
  var results = [],
      pattern = /.+/;

  if( "undefined" === typeof done &&
      "undefined" !== typeof search) {
    done = search;
    search = undefined;
  }

  if("undefined" !== typeof search) {
    var ptext = search .replace(/\./, '\\\.')
                    .replace(/\*/, '.*');
    parrern = new RegExp('^' + ptext + '$');
  }

  fs.readdir(dir, function(err, list) {

    if (err) {
      return done(err);
    }

    var pending = list.length;

    if (!pending) {
      return done(null, results);
    }

    list.forEach(function(file) {
      file = dir + '/' + file;

      fs.stat(file, function(err, stat) { 

        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);

            if (!--pending) {
              done(null, results);
            }

          });

        } else {

          if(parrern.test(file)) {
            results.push(readInfo(file));
          }

          if (!--pending) {
            done(null, results);
          }

        }
      });
    });
  });
};

module.exports = walk;