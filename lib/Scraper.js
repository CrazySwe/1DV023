/**
 * Base Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

class Scraper {
  constructor (url) {
    if (this.constructor === Scraper) {
      throw new TypeError('Abstract class Scraper can not be instantiated directly.')
    }
    this.url = url
    console.dir(this.url)
  }

  

  extractLink (haystack, needle) {

  }

  extractLinksPromise () {
    return new Promise((resolve, reject) => {
      // scrape links.
      resolve(['link1', 'link2', 'link3'])
    })
  }

  getHTMLPromise (url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) reject(error)
        else resolve(body)
      })
    })
  }
}

module.exports = Scraper
