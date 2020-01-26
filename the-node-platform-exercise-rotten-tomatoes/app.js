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
reviewer.printMoviesAverageRating(imdbFilePath)
reviewer.printMoviesAverageRating(rottenTomatoFilePath)
