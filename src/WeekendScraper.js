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

class WeekendScraper {
  constructor (url = 'http://vhost3.lnu.se:20080/weekend') {
    // Initialize everything.
    this.mainUrl = url
    this.calendarUrl = url
    // console.dir(url)
  }

  run () {
    // Running scraper here.
    process.stdout.write('Scraping links...')
    // 1. Scrape links for Calendar, Cinema and Restaurant
    process.stdout.write('OK\n')

    // Use the 3 links to scrape rest.

    process.stdout.write('Scraping available days...')
    // 2.
    process.stdout.write('OK\n')

    process.stdout.write('Scraping showtimes...')
    // 3.
    process.stdout.write('OK\n')

    process.stdout.write('Scraping possible reservations...')
    // 4.
    process.stdout.write('OK\n')

    process.stdout.write('Recommendations\n')
    process.stdout.write('===============\n')
    // 5. Output
  }

  scrapeLinks () {
    return new Promise((resolve, reject) => {
      // scrape links.
      resolve(['link1', 'link2', 'link3'])
    })
  }
}

module.exports = WeekendScraper
