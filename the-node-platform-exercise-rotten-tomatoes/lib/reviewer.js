/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

// const fs = require('fs')
// const fsPromise = require('./fs-promise.js')

const fs = require('fs-extra')
const xml2js = require('xml2js')

/**
 * Prints the average rating for movies from IMDB Json file or RottenTomatoes XML file.
 *
 * @param {string} filePath - Path to the file.
 */
async function printMoviesAverageRating (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8', flag: 'r' })
  const average = arr => arr.reduce((acc, val) => acc + val) / arr.length

  let ratings = []
  if (data.startsWith('<?xml')) {
    ratings = await xml2js.parseStringPromise(data)
      .then(result => result.movies.movie.map(movie => Number(movie.rating)))
  } else {
    ratings = JSON.parse(data).map(movie => Number(movie.rating))
  }
  return average(ratings)
}

module.exports.printMoviesAverageRating = printMoviesAverageRating
