var go = require('./go')()

var CLIPlugin = require('go-plugin-cli')
var FSPlugin = require('go-plugin-fs')
var QuizPlugin = require('go-plugin-quiz')
var HandlebarsPlugin = require('go-plugin-handlebars')

module.exports = go
  .use(CLIPlugin)
  .use(FSPlugin)
  .use(QuizPlugin)
  .use(HandlebarsPlugin)
