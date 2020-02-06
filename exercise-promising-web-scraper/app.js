/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

// What to require?
const fse = require('fs-extra')

// * Get the URLs from process.argv
console.log('Process.')
const varArr = process.argv.slice(2)


// * Scrape/extract all absolute URLs for each URL provided
console.log('Processing <URL>')

// * write or append to file.json?

fse.writeJSON('file.json', ['link1', 'link2', 'link3'], { encoding: 'utf8', spaces: ' ' })
