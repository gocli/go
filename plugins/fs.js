var fs = require('fs')
var resolvePath = require('path').resolve

function installFilePlugin (Go) {
  Go.prototype.copyFile = function (filename, destinationPath) {
    return new Promise(function (resolve, reject) {
      filename = resolvePath(filename)
      destinationPath = resolvePath(destinationPath)

      fs.readFile(filename, function (err, content) {
        if (err) return reject(err)

        fs.writeFile(destinationPath, content, function (err) {
          if (err) return reject(err)
          resolve(destinationPath)
        })
      })
    })
  }

  Go.prototype.moveFile = function (filename, destinationPath) {
    return new Promise(function (resolve, reject) {
      filename = resolvePath(filename)
      destinationPath = resolvePath(destinationPath)

      fs.rename(filename, destinationPath, function (err) {
        if (err) return reject(err)
        resolve(destinationPath)
      })
    })
  }

  Go.prototype.createFile = function (filename, content) {
    return new Promise(function (resolve, reject) {
      filename = resolvePath(filename)

      fs.writeFile(filename, content, function (err) {
        if (err) return reject(err)
        resolve(filename)
      })
    })
  }

  Go.prototype.removeFile = function (filename) {
    return new Promise(function (resolve, reject) {
      filename = resolvePath(filename)

      fs.unlink(filename, function (err) {
        if (err) return reject(err)
        resolve(filename)
      })
    })
  }
}

module.exports = { install: installFilePlugin }
