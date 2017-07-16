var Go = require('./lib/go')
var FSPlugin = require('./plugins/fs')

Go.use(FSPlugin)

module.exports = new Go()
