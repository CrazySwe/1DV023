/**
 * Cinema Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('./Scraper.js')
const cheerio = require('cheerio')

/**
 * The module that scrapes the cinema webpage for movies, times and weekdays.
 *
 * @class CinemaScraper
 * @augments {Scraper}
 */
class CinemaScraper extends Scraper {
  /**
   * Extracts all the available movies from the cinema webpage.
   *
   * @param {string} [url=this.url] - The url to the cinema webpage.
   * @returns {object[]} - The object containing movie data from the cinema.
   * @memberof CinemaScraper
   */
  async getAvailableMovies (url = this.url) {
    const htmlPage = await this.getHTMLPromise(url)

    const days = this.extractDays(htmlPage)
    const movies = this.extractMovies(htmlPage)
    const result = await this.extractAvailableTimes(days, movies)

    result.map(screening => {
      screening.day = days.find(day => day.value === screening.day).day
      screening.movie = movies.find(movie => movie.value === screening.movie).movie
    })
    return result
  }

  /**
   * Extracting the options of days from the cinema website.
   *
   * @param {string} html - The html of cinema website to scrape from.
   * @returns {object[]} - Contains the days that are options on the cinema webpage.
   * @memberof CinemaScraper
   */
  extractDays (html) {
    const $ = cheerio.load(html)
    const days = []
    $('select#day > option').each((index, element) => {
      if (element.attribs.value !== '') {
        days.push({ day: $(element).text(), value: element.attribs.value })
      }
    })
    return days
  }

  /**
   * Extracting the movies that are options on the cinema website.
   *
   * @param {string} html - The html of the cinema website to scrape from.
   * @returns {object[]} - Contains the movies that are options on the cinema webpage.
   * @memberof CinemaScraper
   */
  extractMovies (html) {
    const $ = cheerio.load(html)
    const movies = []
    $('select#movie > option').each((index, element) => {
      if (element.attribs.disabled !== '') {
        movies.push({ movie: $(element).text(), value: element.attribs.value })
      }
    })
    return movies
  }

  /**
   * Extracts the movies which are not yet fully booked.
   *
   * @param {object[]} days - The days which to extract for.
   * @param {object[]} movies - The movies which to extract for.
   * @returns {object[]} - Return the movies that are available and not fully booked.
   * @memberof CinemaScraper
   */
  async extractAvailableTimes (days, movies) {
    const extractPromises = []
    days.forEach(day => {
      movies.forEach(movie => {
        extractPromises.push(this.extractScreeningTimes(day.value, movie.value))
      })
    })
    return Promise.all(extractPromises).then(promise => promise.flat().filter(obj => obj.status === 1))
  }

  /**
   * Extracts the screening times for a specific day and movie.
   *
   * @param {string} day - Represents the websites string for weekday search.
   * @param {string} movie - Represents the websites string for movie search.
   * @returns {object} - Object containing screening time for a specific day and movie.
   * @memberof CinemaScraper
   */
  async extractScreeningTimes (day, movie) {
    return JSON.parse(await this.getHTMLPromise(this.url + '/check?day=' + day + '&movie=' + movie))
  }
}

module.exports = CinemaScraper
