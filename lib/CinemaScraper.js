/**
 * Cinema Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const Scraper = require('./Scraper.js')
const cheerio = require('cheerio')

class CinemaScraper extends Scraper {
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

  async extractAvailableTimes (days, movies) {
    const extractPromises = []
    days.forEach(day => {
      movies.forEach(movie => {
        extractPromises.push(this.extractScreeningTimes(day.value, movie.value))
      })
    })
    return Promise.all(extractPromises).then(promise => promise.flat().filter(obj => obj.status === 1))
  }

  async extractScreeningTimes (day, movie) {
    return JSON.parse(await this.getHTMLPromise(this.url + '/check?day=' + day + '&movie=' + movie))
  }
}

module.exports = CinemaScraper
