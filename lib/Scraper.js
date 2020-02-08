/**
 * Scraper Module.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

export class Scraper {
  constructor () {
    if (this.constructor === Scraper) {
      throw new TypeError('Abstract class Scraper can not be instantiated directly.')
    }
  }
}
