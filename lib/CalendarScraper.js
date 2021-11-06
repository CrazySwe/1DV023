/**
 * Calendar Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('./Scraper.js')
const cheerio = require('cheerio')

/**
 * Module to scrape the calendars of multiple persons
 * and returns persons matching availability.
 *
 * @class CalendarScraper
 * @augments {Scraper}
 */
class CalendarScraper extends Scraper {
  /**
   * Extracts the available days for the persons from a main calendar page.
   *
   * @param {string} [url=this.url] - The main calendar page which all persons calendar links are on.
   * @returns {object[]} - An array of objects for each day and if it's available.
   * @memberof CalendarScraper
   */
  async getAvailableDays (url = this.url) {
    const htmlPage = await this.getHTMLPromise(url)
    const $ = cheerio.load(htmlPage)
    const personPromises = []
    const days = ['friday', 'saturday', 'sunday']
    $('li > a:contains("calendar")').each((index, element) => {
      personPromises.push(this.scrapePerson(url + element.attribs.href))
    })

    const result = (await Promise.all(personPromises)).reduce((acc, value, index) => {
      return [(acc[0] &= value[0]), (acc[1] &= value[1]), (acc[2] &= value[2])]
    })

    return result.map((value, index) => {
      return {
        day: days[index],
        available: value
      }
    })
  }

  /**
   * Scrapes a specific persons calendar page.
   *
   * @param {string} [url=this.url] - The url to a specific persons calendar.
   * @returns {boolean[]} - An array of booleans in the format of availability [friday, saturday, sunday].
   * @memberof CalendarScraper
   */
  async scrapePerson (url = this.url) {
    const htmlPage = await this.getHTMLPromise(url)
    const $ = cheerio.load(htmlPage)
    const days = [true, true, true]

    $('table td').each((index, element) => {
      days[index] &= ($(element).text().toUpperCase() === 'OK')
    })
    return days
  }
}

module.exports = CalendarScraper
