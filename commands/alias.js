var fail = require('../lib/fail');
var complete = require('../lib/complete');
var aliasStore = require('../lib/store').alias;

function printAliases() {
  var store = aliasStore();
  var names = Object.keys(store);

  if (!names.length) fail('No registered aliases');

  console.log(' Aliases list');
  names.sort().map(function(name) {
    console.log(name + ': \t' + store[name]);
  });
  complete();
}

function printAlias(name) {
  var alias = aliasStore(name);
  if (!alias) fail('Alias "' + name + '" is not found');
  complete(name + ' is aliased with "' + alias + '"');
}

function saveAlias(name, alias) {
  aliasStore(name, alias);
  printAlias(name);
}

//$ go alias [alias-name [aliased command]]
function aliasCommand(args) {
  if (args.length < 2) printAliases();
  else if (args.length === 2) printAlias(args[1]);
  else saveAlias(args[1], args.slice(2).join(' '));
}

module.exports = aliasCommand;
