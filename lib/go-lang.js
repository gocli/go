var whichAll = require('../lib/which-all');

function findGoLangBinary() {
  var res = whichAll('go');
  if (res.code) return false;

  var bins = res.filter(function(bin) { return bin });
  if (bins.length > 1) return bins[1];
  return false;
}

module.exports = {
  findBinary: findGoLangBinary
};
