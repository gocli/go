var fs = require('fs');
var path = require('path');
var fail = require('./fail');

module.exports = function(dest) {
  var fullDest = path.resolve(dest);
  if (!fs.existsSync(fullDest)) {
    var res = fs.mkdirSync(fullDest);
    fail('Can not create directory (' + dest + '): ' + res.stderr);
  }
};
