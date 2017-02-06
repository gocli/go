var fs = require('fs');
var fail = require('./fail');
var detectCommand = require('./detect-command');
var aliasStore = require('./store').alias;

var resolveLoops = 0;
function resolveAlias(name) {
  var command = aliasStore(name);
  if (!command) return name;
  if (++resolveLoops > 99) {
    fail('Be careful with aliases - they can be recursive');
  }
  return resolveAlias(command);
}

function go(originArgs) {
  var args = originArgs.length
    ? [resolveAlias(originArgs[0])].concat(originArgs.slice(1))
    : originArgs;
  var commandName = detectCommand(args);
  var commandPath = __dirname + '/../commands/' + commandName + '.js';
  if (!fs.existsSync(commandPath)) {
    fail('The command "' + commandName + '" is not supported');
  }
  var command = require(commandPath);
  return command(args);
}

module.exports = go;
