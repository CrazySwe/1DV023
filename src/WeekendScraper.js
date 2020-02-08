/**
 * WeekendScraper.
 * This application is serving as and
 * automated process for Peter, Paul and Mary's
 * night out one weekend a month.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

class WeekendScraper {
  constructor (url = 'http://vhost3.lnu.se:20080/weekend') {
    // Initialize everything.
    this.url = url
    // console.dir(url)
  }

  run () {
    // Running scraper here.
  }
}

module.exports.WeekendScraper = WeekendScraper
