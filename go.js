function use (plugin, options) {
  if (this instanceof Go) {
    if (matchPlugin(plugin, this)) return this

    if (plugin && typeof plugin.install === 'function') {
      plugin.install(this, options)
    } else if (typeof plugin === 'function') {
      plugin.call(null, this, options)
    } else {
      throw new ReferenceError('\'plugin\' must be a function or an object with install method')
    }

    this._plugins.push(plugin)

    return this
  } else {
    throw new ReferenceError('use() should be called on instance of Go')
  }
}

function isUsed (plugin) {
  return matchPlugin(plugin, this)
}

function matchPlugin (plugin, instance) {
  for (var i = instance._plugins.length; i--;) {
    if (instance._plugins[i] === plugin) return true
  }
  return false
}

var shouldCreateRealInstance = false

function Go () {
  if (!shouldCreateRealInstance) {
    shouldCreateRealInstance = true
    var go = new Go
    shouldCreateRealInstance = false
    return go
  }
  this._plugins = []
}

Go.prototype.use = use
Go.prototype.isUsed = isUsed

module.exports = Go
