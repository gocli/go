var go = require('./go')()
var FSPlugin = require('./plugins/fs')

module.exports = go
  .use(FSPlugin)
