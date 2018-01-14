var fs = require('fs')
var resolvePath = require('path').resolve
var normalizePath = require('path').normalize

function installFilePlugin (proto) {
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

  proto.createPath = function (path) {
    return new Promise(function (resolve, reject) {
      createPath(normalizePath(path), resolvePath('.'), function (err) {
        if (err) return reject(err)
        resolve(path)
      })
    })
  }

  proto.checkIfRealPath = function (filename) {
    return new Promise(function (resolve, reject) {
      fs.stat(filename, function (err, stat) {
        if (err) resolve(false)
        else resolve(true)
      })
    })
  }
}

function createPath (path, from, cb) {
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
        createPath(newPath, newFolder, cb)
      })
    } else {
      if (!stats.isDirectory()) return cb(new Error('Path contains not a directoty'))
      createPath(newPath, newFolder, cb)
    }
  })
}

module.exports = { install: installFilePlugin }
