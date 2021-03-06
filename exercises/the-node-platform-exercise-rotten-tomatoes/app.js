/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const reviewer = require('./lib/reviewer.js')

// First get the files.
const imdbFilePath = './lib/movies/movies.json'
const rottenTomatoFilePath = './lib/movies/movies.xml'

// Solving by using fs and xml2js module
console.log('Average rating')

const imdbPromise = reviewer.printMoviesAverageRating(imdbFilePath)
const rottenTomatoPromise = reviewer.printMoviesAverageRating(rottenTomatoFilePath)

Promise.all([imdbPromise, rottenTomatoPromise]).then(values => {
  console.log('IMDB: ' + values[0])
  console.log('Rotten Tomatoes: ' + values[1] + ' %')
})
