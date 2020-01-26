/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

// const fs = require('fs')

const fsPromise = require('./fs-promise.js')
const xml2js = require('xml2js')

/**
 * Prints the average rating for movies from IMDB Json file or RottenTomatoes XML file.
 *
 * @param {string} filePath - Path to the file.
 */
async function printMoviesAverageRating (filePath) {
  const data = await fsPromise.readFile(filePath, { encoding: 'utf8', flag: 'r' })

  const average = arr => arr.reduce((acc, val) => acc + val) / arr.length

  return new Promise((resolve, reject) => {
    if (data.startsWith('<?xml')) {
      xml2js.parseString(data, (err, result) => {
        if (err) throw err
        const ratings = result.movies.movie.map(movie => Number(movie.rating))
        resolve(average(ratings))
      })
    } else {
      const ratings = JSON.parse(data).map(movie => movie.rating)
      resolve(average(ratings))
    }
  })
}

module.exports.printMoviesAverageRating = printMoviesAverageRating
