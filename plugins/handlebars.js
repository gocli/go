var Handlebars = require('handlebars')
var fsPlugin = require('./fs')
var sep = require('path').sep
var DEFAULT_TEMPLATE_DIR = '.templates'

function installHandlebarsPlugin (proto) {
  var templateDir = DEFAULT_TEMPLATE_DIR

  proto.use(fsPlugin)

  proto.setTemplateDir = function setTemplateDir (path) {
    if (!path) throw new Error('specify path for template directory')
    templateDir = path.toString()
  }

  proto.getTemplateDir = function getTemplateDir () {
    return templateDir
  }

  proto.loadTemplate = function loadTemplate (templateName) {
    function createRenderFunction (template) {
      return function renderTemplate (contextOrPath, path) {
        var context

        if (typeof contextOrPath === 'string') {
          path = contextOrPath
        } else if (contextOrPath) {
          context = contextOrPath
        }

        var content = template(context)

        if (!path) return Promise.resolve(content)
        return proto.writeFile(path, content)
          .then(function () { return content })
      }
    }

    return readTemplate(templateDir + sep + templateName)
      .then(createRenderFunction)
  }

  proto.processTemplate = function processTemplate (path, context) {
    return readTemplate(path)
      .then(function (template) {
        return template(context)
      })
      .then(function (content) {
        return proto.writeFile(path, content)
      })
  }

  proto.registerTemplatePartial = function registerTemplatePartial (name, template) {
    Handlebars.registerPartial(name, template)
  }

  proto.registerTemplateHelper = function registerTemplateHelper (name, renderFn) {
    Handlebars.registerHelper(name, renderFn.bind(Handlebars))
  }

  function readTemplate (path) {
    return proto.readFile(path)
      .then(function(templateContent) {
        return Handlebars.compile(templateContent)
      })
  }
}

module.exports = { install: installHandlebarsPlugin }
