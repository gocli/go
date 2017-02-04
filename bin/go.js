#! /usr/bin/env node
var path = require('path');
var shell = require('shelljs');
var download = require('download-github-repo');
var fs = require('fs');
require('../lib/which');

const storePath = path.resolve(path.join(__dirname, '..', 'store.json'));

if (!fs.existsSync(storePath)) {
  fs.writeFileSync(storePath, JSON.stringify({}));
}

var aliases = require(storePath);

const goWhiteList = [
  /^[-a-z\d]+\/[-_a-z\d]+$/i,
  /^alias$/i
];

var args = process.argv.slice(2);

var res = shell.whichAll('go');
if (!shell.error() && runGo(res.stdout)) return;

if (!args.length) {
  console.log('Specify repositiory');
  process.exit(1);
}

if (args[0] == 'alias') {
  if (args.length < 3) {
    console.log('provide source and name for alias');
    process.exit(4);
  }
  aliases[args[2]] = args[1];
  fs.writeFileSync(storePath, JSON.stringify(aliases));
} else {
  let dir = args.length > 1 ? args[1] : args[0].split('/')[1];
  if (!dir) dir = args[0];
  let repo = aliases[args[0]] || args[0];
  go(dir, repo);
}

function runGo(whichGo) {
  var bins = whichGo.split('\n')
    .filter(function(bin) { return bin });

  if (bins.length > 1 && args.length) {
    if (matchGoCommand(args)) {
      shell.exec([bins[1]].concat(args).join(' '));
      return true;
    }
  }

  return false;
}

function matchGoCommand(args) {
  var isAlias = !!aliases[args[0]];
  if (isAlias) return false;
  return !goWhiteList.find(rule => !args[0].match(rule));
}

function go(dest, repo) {
  if (!fs.existsSync(path.resolve(dest))) {
    let res = shell.mkdir(path.resolve(dest));
    if (shell.error()) {
      console.log('Can not create directory (' + dest + '):', res.stderr);
      process.exit(2);
    }
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
