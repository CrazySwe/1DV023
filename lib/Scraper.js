/**
 * Base Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const request = require('request')

class Scraper {
  constructor (url) {
    if (this.constructor === Scraper) {
      throw new TypeError('Abstract class Scraper can not be instantiated directly.')
    }
    this.url = url
  }

  // May not be needed?
  // extractLink (haystack, needle) {

  // }

  // extractLinksPromise () {
  //   return new Promise((resolve, reject) => {
  //     // scrape links.
  //     resolve(['link1', 'link2', 'link3'])
  //   })
  // }

  getHTMLPromise (url = this.url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error && response.statusCode !== 200) reject(error)
        else resolve(body)
      })
    })
  }
}

module.exports = Scraper
