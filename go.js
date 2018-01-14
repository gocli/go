function use (plugin, options) {
  plugin.install(this, options)
  return this
}

var shouldCreateRealInstance = false

function Go () {
  if (!shouldCreateRealInstance) {
    shouldCreateRealInstance = true
    var go = new Go
    shouldCreateRealInstance = false
    return go
  }
}

Go.prototype.use = use

module.exports = Go
