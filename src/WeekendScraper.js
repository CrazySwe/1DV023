/**
 * WeekendScraper.
 * This application is serving as an
 * automated process for Peter, Paul and Mary's
 * night out one weekend a month to find an
 * appropriate time.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('../lib/Scraper.js')
const CalendarScraper = require('../lib/CalendarScraper.js')
const CinemaScraper = require('../lib/CinemaScraper.js')
const RestaurantScraper = require('../lib/RestaurantScraper.js')

class WeekendScraper extends Scraper {
  constructor (url = 'http://vhost3.lnu.se:20080/weekend') {
    super(url)
    // Initialize everything.
    this.mainUrl = url
    this.calendarScraper = url
    // console.dir(url)
  }

  async run () {
    // Running scraper here.
    process.stdout.write('Scraping links...')
    const html = await this.getHTMLPromise()
    console.dir(html)

    // 1. Scrape links for Calendar, Cinema and Restaurant
    process.stdout.write('OK\n')

    // Use the 3 links to scrape rest.
    const calScraper = new CalendarScraper('http://vhost3.lnu.se:20080/calendar/')
    const cinScraper = new CinemaScraper('Cinema:url')
    const restScraper = new RestaurantScraper('Restaurant:url')
    //
    //

    process.stdout.write('Scraping available days...')
    // 2.
    // const days = await calScraper.getDays()
    process.stdout.write('OK\n')

    process.stdout.write('Scraping showtimes...')
    // 3.
    process.stdout.write('OK\n')

    process.stdout.write('Scraping possible reservations...')
    // 4.
    process.stdout.write('OK\n')

    process.stdout.write('\nRecommendations\n')
    process.stdout.write('===============\n')
    // 5. Output
  }
}

module.exports = WeekendScraper
