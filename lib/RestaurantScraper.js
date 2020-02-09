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

class RestaurantScraper extends Scraper {
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

  convertValueToObj (valueStr) {
    let day = valueStr.substring(0, 3)
    const start = valueStr.substring(3, 5)
    const end = valueStr.substring(5)
    day = (day === 'fri') ? 'friday' : (day === 'sat') ? 'saturday' : 'sunday'
    return { day: day, start: start, end }
  }

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
