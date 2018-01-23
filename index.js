var go = require('./go')()

var FSPlugin = require('./plugins/fs')
var QuizPlugin = require('./plugins/quiz')
var HandlebarsPlugin = require('./plugins/handlebars')

module.exports = go
  .use(FSPlugin)
  .use(QuizPlugin)
  .use(HandlebarsPlugin)
