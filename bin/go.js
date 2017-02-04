#! /usr/bin/env node
var path = require('path');
var shell = require('shelljs');
var download = require('download-github-repo');
require('../lib/which');

var args = process.argv.slice(2);

var res = shell.whichAll('go');
if (!shell.error() && runGo(res.stdout)) return;

if (!args.length) {
  console.log('Specify repositiory');
  process.exit(1);
}
const dir = args.length > 1 ? args[1] : args[0].split('/')[1];
go(dir, args[0]);

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

function go(dest, repo) {
  var res = shell.mkdir(path.resolve(dest));
  if (shell.error()) {
    console.log('Can not create directory (' + dest + '):', res.stderr);
    process.exit(2);
  }

  console.log('Loading sources...');
  download(repo, dest, function(err) {
    if (err) {
      console.log('Can not download repo (' + repo + '):', err);
      process.exit(3);
    }
    console.log('You are ready! Check the boilerplate at', dest);
  });
}
