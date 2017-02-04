var download = require('download-github-repo');
var fail = require('../lib/fail');
var complete = require('../lib/complete');

//$ go username/repository [destination]
module.exports = function(args) {
  var repo = args[0];
  var dest = args[1] || args[0].split('/')[1];

  console.log('Loading sources...');
  download(repo, dest, function(err) {
    if (err) fail('Can not download repo (' + repo + '): ' + err);
    complete('Code is ready! Check it in the "' + dest + '" directory');
  });
};
