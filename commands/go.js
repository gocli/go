var shell = require('shelljs');
var fail = require('../lib/fail');
var goLang = require('../lib/go-lang');

//$ go command [arguments]
module.exports = function(args) {
  var binary = goLang.findBinary();
  var res = shell.exec([binary].concat(args).join(' '));
  if (res.code) fail();
};
