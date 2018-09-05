const use = (go, plugins, plugin, options = {}) => {
  if (matchPlugin(plugins, plugin)) return go

  if (plugin && typeof plugin.install === 'function') {
    plugin.install(go, options)
    plugins.push(plugin.install)
  } else if (typeof plugin === 'function') {
    plugin(go, options)
    plugins.push(plugin)
  } else {
    throw new ReferenceError('\'plugin\' must be a function or an object with install method')
  }

  return go
}

const isUsed = (plugins, plugin) => {
  if (plugin && typeof plugin.install === 'function') {
    plugin = plugin.install
  }
  return matchPlugin(plugins, plugin)
}

const matchPlugin = (plugins, plugin) => {
  for (let i = plugins.length; i--;) {
    if (plugins[i] === plugin) return true
  }
  return false
}

let shouldCreateRealInstance = false

function Go () {
  if (!shouldCreateRealInstance) {
    shouldCreateRealInstance = true
    const go = new Go()
    const plugins = []
    shouldCreateRealInstance = false
    go.use = use.bind(null, go, plugins)
    go.isUsed = isUsed.bind(null, plugins)
    return go
  }
}

module.exports = Go
