/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const fs = require('fs')
const xml2js = require('xml2js')

/**
 * Prints the average rating for movies from IMDB Json file or RottenTomatoes XML file.
 *
 * @param {string} filePath - Path to the file.
 */
function printMoviesAverageRating (filePath) {
  const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
  const average = arr => arr.reduce((acc, val) => acc + val) / arr.length

  if (data.startsWith('<?xml')) {
    xml2js.parseString(data, (err, result) => {
      if (err) throw err
      const ratings = result.movies.movie.map(movie => Number(movie.rating))
      // console.log('Rotten Tomatoes: ' + ratings.reduce((acc, val) => acc + val) / ratings.length + ' %')
      console.log('Rotten Tomatoes: ' + average(ratings) + ' %')
    })
  } else {
    const ratings = JSON.parse(data).map(movie => movie.rating)
    console.log('IMDB: ' + average(ratings))
  }
}

module.exports.printMoviesAverageRating = printMoviesAverageRating
