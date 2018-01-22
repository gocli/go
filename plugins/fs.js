var fs = require('fs')
var resolvePath = require('path').resolve
var pathSep = require('path').sep
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
      createDir(normalizePath(path), resolvePath('.'), function (err) {
        if (err) return reject(err)
        resolve(path)
      })
    })
  }

  proto.removeDir = function (path) {
    return new Promise(function (resolve, reject) {
      fs.rmdir(normalizePath(path), function (err) {
        if (err) return reject(err)
        resolve(path)
      })
    })
  }
}

function createDir (path, from, cb) {
  if (!path.length) return cb(null, from)

  var sepIndex = path.indexOf(pathSep)
  var newDir = from + pathSep + (~sepIndex ? path.slice(0, sepIndex) : path)
  var newPath = ~sepIndex ? path.slice(sepIndex + 1) : ''
  fs.stat(newDir, function (err, stats) {
    if (err) {
      fs.mkdir(newDir, function (err) {
        if (err) return cb(err)
        createDir(newPath, newDir, cb)
      })
    } else {
      if (!stats.isDirectory()) return cb(new Error('Path contains not a directoty'))
      createDir(newPath, newDir, cb)
    }
  })
}

module.exports = { install: installFSPlugin }
