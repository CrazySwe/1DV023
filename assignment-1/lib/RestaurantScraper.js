/**
 * Restaurant Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('./Scraper.js')
const request = require('request')
const cheerio = require('cheerio')

/**
 * Scraper for the restaurant website.
 *
 * @class RestaurantScraper
 * @augments {Scraper}
 */
class RestaurantScraper extends Scraper {
  /**
   * Gets the available times that are bookable on the restaurant.
   *
   * @returns {object[]} - An object containing all the available times with weekdays that are bookable.
   * @memberof RestaurantScraper
   */
  async getAvailableTimes () {
    const formData = {
      username: 'zeke',
      password: 'coys',
      submit: 'login'
    }
    const options = {
      url: this.url + '/login',
      method: 'POST',
      jar: true,
      followAllRedirects: true
    }

    const html = await this.getHTMLLoginFormPromise(options, formData)
    const $ = cheerio.load(html)

    const result = []

    $('form > div > p > input').each((index, element) => {
      result.push(this.convertValueToObj(element.attribs.value))
    })
    return result
  }

  /**
   * Converts the restaurants website radiobutton value to an object.
   *
   * @param {string} valueStr - String representing the data.
   * @returns {object} - The object representing the day and time period of the booking available.
   * @memberof RestaurantScraper
   */
  convertValueToObj (valueStr) {
    let day = valueStr.substring(0, 3)
    const start = valueStr.substring(3, 5)
    const end = valueStr.substring(5)
    day = (day === 'fri') ? 'friday' : (day === 'sat') ? 'saturday' : 'sunday'
    return { day: day, start: start, end: end }
  }

  /**
   * Specific Promisified HTML extractor for using form data.
   *
   * @param {object} options - The options used by request package.
   * @param {object} formData - The form data to send.
   * @returns {Promise<string>} - The HTML of the resulting webpage.
   * @memberof RestaurantScraper
   */
  getHTMLLoginFormPromise (options, formData) {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error && response.statusCode !== 200) reject(error)
        else resolve(body)
      }).form(formData)
    })
  }
}

module.exports = RestaurantScraper
