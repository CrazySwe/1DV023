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
const cheerio = require('cheerio')

class WeekendScraper extends Scraper {
  constructor (url = 'http://vhost3.lnu.se:20080/weekend') {
    super(url)
  }

  async run () {
    // Running scraper here.
    process.stdout.write('Scraping links...')
    const html = await this.getHTMLPromise(this.url)
    const page = cheerio.load(html)

    // Might be a bad idea since css selection is case sensitive on :contains.
    const calendarUrl = page('li > a:contains("Calendar")').attr('href')
    const cinemaUrl = page('li > a:contains("cinema")').attr('href')
    const restaurantUrl = page('li > a:contains("restaurant")').attr('href')
    // else try to use this approach.
    // page('li > a').each((index, element) => {
    //   console.dir(element)
    //   // console.dir(index)
    // })

    // 1. Scrape links for Calendar, Cinema and Restaurant
    process.stdout.write('OK\n')

    // Use the 3 links to scrape rest.
    const calScraperPromise = new CalendarScraper(calendarUrl).getAvailableDays()
    const cinScraper = new CinemaScraper(cinemaUrl)
    const restScraper = new RestaurantScraper(restaurantUrl)
    //
    //

    process.stdout.write('Scraping available days...')
    // 2.
    const availableDays = await calScraperPromise
    // console.dir(availableDays)
    process.stdout.write('OK\n')

    process.stdout.write('Scraping showtimes...')
    // 3.
    // const times
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
