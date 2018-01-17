var go = require('./go')()
var FSPlugin = require('./plugins/fs')
var QuizPlugin = require('./plugins/quiz')

module.exports = go
  .use(FSPlugin)
  .use(QuizPlugin)
