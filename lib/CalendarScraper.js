/**
 * Calendar Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('./Scraper.js')

class CalendarScraper extends Scraper {
  constructor (url) {
    super(url)
  }

  getAvailableDays (url = this.url) {
    return new Promise((resolve, reject) => {

      // request(url, (error, response, body) => {
      //   if (error && response.statusCode !== 200) reject(error)
      //   else resolve(body)
      // })
    })
  }
}

module.exports = CalendarScraper
