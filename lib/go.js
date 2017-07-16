function use (plugin, options) {
  plugin.install(Go, options)
}

function Go () {}

Go.prototype = {
  constructor: Go,
  use: use
}

Go.use = use

module.exports = Go
