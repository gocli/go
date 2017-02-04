#! /usr/bin/env node
var shell = require('shelljs');
var args = process.argv.slice(2);

var res = shell.exec('which -a go', { silent: true });
if (!res.code && runGo(res.stdout)) return;

console.log('Can Go now');

function runGo(whichGo) {
  var bins = whichGo.split('\n')
    .filter(function(bin) { return bin });

  if (bins.length > 1) {
    if (args.length && !args[0].match(/^[-a-z\d]+\/[-_a-z\d]+$/i)) {
      shell.exec([bins[1]].concat(args).join(' '));
      return true;
    }
  }

  return false;
}
