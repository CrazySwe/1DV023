/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

// What to require?
const fse = require('fs-extra')
const scrape = require('./lib/myscraper.js')


// * Get the URLs from process.argv
console.log('Input links')
const varArr = process.argv.slice(2)

// * Scrape/extract all absolute URLs for each URL provided.

/**
 * What to use as client.
 * Request.
 *
 * What to parse/extract all the links with.
 * * cheerio.
 */

scrape.extractLinks(varArr)
//  .then(link => console.log(link))
console.log('Processing <URL>')

// * write or append to file.json?

fse.writeJSON('./lib/file.json', ['link1', 'link2', 'link3'], { encoding: 'utf8', spaces: ' ' })
