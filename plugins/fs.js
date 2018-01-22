var fs = require('fs')
var resolvePath = require('path').resolve
var normalizePath = require('path').normalize

function installFSPlugin (proto) {
  proto.copyFile = function (filename, destinationPath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(filename, function (err, content) {
        if (err) return reject(err)

        fs.writeFile(destinationPath, content, function (err) {
          if (err) return reject(err)
          resolve(destinationPath)
        })
      })
    })
  }

  proto.moveFile = function (filename, destinationPath) {
    return new Promise(function (resolve, reject) {
      fs.rename(filename, destinationPath, function (err) {
        if (err) return reject(err)
        resolve(destinationPath)
      })
    })
  }

  proto.createFile = function (filename, content) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(filename, content, function (err) {
        if (err) return reject(err)
        resolve(filename)
      })
    })
  }

  proto.removeFile = function (filename) {
    return new Promise(function (resolve, reject) {
      fs.unlink(filename, function (err) {
        if (err) return reject(err)
        resolve(filename)
      })
    })
  }

  proto.createDir = function (path) {
    return new Promise(function (resolve, reject) {
      createDir(normalizePath(path), function (err) {
        if (err) return reject(err)
        resolve(path)
      })
    })
  }
}

function createDir (path, cb) {
  var from = resolvePath('.')
  var sepIndex = path.indexOf('/')
  if (sepIndex < 0 && !path.length) {
    cb(null, from)
    return
  }
  var newFolder = from + path.slice(0, sepIndex)
  var newPath = path.slice(sepIndex)
  fs.stat(newFolder, function (err, stats) {
    if (err) {
      fs.mkdir(newFolder, function (err) {
        if (err) return cb(err)
        createDir(newPath, newFolder, cb)
      })
    } else {
      if (!stats.isDirectory()) return cb(new Error('Path contains not a directoty'))
      createDir(newPath, newFolder, cb)
    }
  })
}

module.exports = { install: installFSPlugin }
