var Enquirer = require('enquirer')
var enquirer = new Enquirer()
enquirer.register('confirm', require('prompt-confirm'))
enquirer.register('list', require('prompt-list'))

function uid () { return (uid.id || 0) + 1 }

function chainQuestions (questions, answers) {
  questions = questions || []
  answers = answers || []

  if (!questions.length) return Promise.resolve(answers)

  return questions[0]().then(function (answer) {
    return chainQuestions(questions.slice(1), answers.concat([answer]))
  })
}

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
  proto.ask = function (questions, options) {
    options = options || {}
    var multipleAnswers = true

    if (!(questions instanceof Array)) {
      multipleAnswers = false
      questions = [questions]
    }

    var type, message, qOptions, question, qsChain = []
    for (var i = 0; i < questions.length; i++) {
      question = questions[i]
      qOptions = Object.assign({}, options)

      if (typeof question === 'string') {
        message = question
      } else {
        message = question.message
        if (question.options) {
          Object.assign(qOptions, question.options)
        }
      }

      type = question.type || (qOptions.choices ? 'list' : 'input')

      qsChain.push(ask.bind(null, type, message, qOptions))
    }

    return multipleAnswers ? chainQuestions(qsChain) : qsChain[0]()
  }

  proto.confirm = ask.bind(null, 'confirm')
}

module.exports = { install: installQuizPlugin }
