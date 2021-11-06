/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'
const fs = require('fs')

/**
 * Reads file and returns Promise.
 *
 * @param {string} filePath - The path to the file.
 * @param {string|object} fsOptions - Strings or an object of option strings.
 * @returns {Promise<string|Buffer>} - The content of the file.
 */
function readFile (filePath, fsOptions) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, fsOptions, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports.readFile = readFile
