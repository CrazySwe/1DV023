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
    
    console.dir(days)
    console.dir(movies)
    // Scrape ID's first?

    // const day = '06'
    // const movie = '02'
    // console.dir(JSON.parse(await this.getHTMLPromise(url + '/check?day=' + day + '&movie=' + movie)))
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

  extractAvailableMovies (days, movies) {

  }
}

module.exports = CinemaScraper
