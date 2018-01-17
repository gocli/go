var Enquirer = require('enquirer');

function uid () { return uid.id = (uid.id || 0) + 1 }

function installQuizPlugin (proto) {
  var enquirer = new Enquirer();

  proto.ask = function (question) {
    var qid = uid().toString()
    enquirer.question(qid, question)
    return enquirer.ask(qid)
      .then(function (result) { return result[qid] })
  }
}

module.exports = { install: installQuizPlugin }
