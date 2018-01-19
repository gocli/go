var Enquirer = require('enquirer')
var enquirer = new Enquirer()
enquirer.register('confirm', require('prompt-confirm'))
enquirer.register('list', require('prompt-list'))

function uid () { return (uid.id || 0) + 1 }

function ask (type, message, options) {
  var name = uid().toString()

  var question = Object.assign((options || {}), {
    name: name,
    message: message,
    type: type
  })

  enquirer.question(question)
  return enquirer.prompt(name)
    .then(function (answers) { return answers[name] })
}

function installQuizPlugin (proto) {
  proto.ask = function (message, options) {
    options = options || {}
    if (options.choices) {
      return ask('list', message, options)
    } else {
      return ask('input', message, options)
    }
  }
  proto.confirm = ask.bind(null, 'confirm')
}

module.exports = { install: installQuizPlugin }
