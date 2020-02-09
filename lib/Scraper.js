/**
 * Base Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const request = require('request')

/**
 * Base Scraper Class Module with generic scraping.
 *
 * @class Scraper
 */
class Scraper {
  /**
   * Creates an instance of Scraper.
   *
   * @param {string} url - The url to scrape or extract from.
   * @memberof Scraper
   */
  constructor (url) {
    if (this.constructor === Scraper) {
      throw new TypeError('Abstract class Scraper can not be instantiated directly.')
    }
    this.url = url
  }

  /**
   * Gets the entire HTML webpage from the URL that is provided.
   *
   * @param {string} [url=this.url] - The url to extract the HTML from.
   * @returns {Promise<string>} - The HTML body of the page.
   * @memberof Scraper
   */
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
