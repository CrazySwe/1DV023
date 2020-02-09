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

/**
 * The main application for scraping multiple sources and puzzling
 * a weekend plan together.
 *
 * @class WeekendScraper
 * @augments {Scraper}
 */
class WeekendScraper extends Scraper {
  /**
   * Creates an instance of WeekendScraper.
   *
   * @param {string} [url='http://vhost3.lnu.se:20080/weekend'] - URL to main site to scrape from.
   * @memberof WeekendScraper
   */
  constructor (url = 'http://vhost3.lnu.se:20080/weekend') {
    super(url)
  }

  /**
   * Runs the main function of scraping from different sources and presenting a recommendation.
   *
   * @memberof WeekendScraper
   */
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
    process.stdout.write('OK\n')

    // Use the 3 links to scrape rest.
    const calScraperPromise = new CalendarScraper(calendarUrl).getAvailableDays()
    const cinScraperPromise = new CinemaScraper(cinemaUrl).getAvailableMovies()
    const restScraperPromise = new RestaurantScraper(restaurantUrl).getAvailableTimes()

    process.stdout.write('Scraping available days...')
    // 2.
    const availableDays = await calScraperPromise
    // console.dir(availableDays)
    process.stdout.write('OK\n')

    process.stdout.write('Scraping showtimes...')
    // 3.
    const showTimes = await cinScraperPromise
    // console.dir(showTimes)
    process.stdout.write('OK\n')

    process.stdout.write('Scraping possible reservations...')
    // 4.
    const openReservations = await restScraperPromise
    // console.dir(openReservations)
    process.stdout.write('OK\n')

    process.stdout.write('\nRecommendations\n')
    process.stdout.write('===============\n')

    this.printRecommendations(availableDays, showTimes, openReservations)
    // 5. Output
  }

  printRecommendations (calendar, cinema, restaurant) {
    const isPossible = calendar.reduce((acc, value, index) => { return (acc |= value.available) }, 0)
    if (!isPossible) {
      process.stdout.write('No available days found.')
      return null
    }
    calendar.map((weekDay, index) => {
      if (weekDay.available) {
        cinema.filter(movie => movie.day.toLowerCase() === weekDay.day.toLowerCase())
          .map(movies => {
            restaurant.filter(foodTime => foodTime.day.toLowerCase() === weekDay.day.toLowerCase())
              .map(foodTime => {
                const eatingTime = Number(movies.time.substr(0, 2)) + 2
                if (eatingTime === Number(foodTime.start)) {
                  this.printRecommendation(weekDay.day, movies.movie, movies.time, foodTime.start + ':00', foodTime.end + ':00')
                }
              })
          })
      }
    })
  }

  printRecommendation (day, movieTitle, movieStart, foodStart, foodEnd) {
    day = day.charAt(0).toUpperCase() + day.substring(1)
    process.stdout.write(`* On ${day} the movie "${movieTitle}" starts at ${movieStart} and there is a free table between ${foodStart}-${foodEnd}.\n`)
  }
}

module.exports = WeekendScraper
