var fs = require('fs');
var path = require('path');

var storePath = path.resolve(path.join(__dirname, '..', 'store.json'));

var aliasStore = (function() {
  var store = null;
  var _initAliasStore = function() {
    if (!fs.existsSync(storePath)) {
      fs.writeFileSync(storePath, JSON.stringify({}));
    }
    store = require(storePath);
  };

  return function() {
    if (!store) _initAliasStore();
    return store;
  };
})();

module.exports = {
  alias: function(alias, command) {
    var store = aliasStore();
    if (!alias) return store;
    if (!command) return store[alias];
    store[alias] = command;
    fs.writeFileSync(storePath, JSON.stringify(store));
  }
};
