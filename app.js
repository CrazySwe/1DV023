/**
 * Exam Assignment 1 in course 1DV023.
 * Web Scraper.
 * This file serves as an entry point.
 *
 * @author Kevin Cederholm <kc222en>
 * @version 1.0.0
 */
'use strict'

const WeekendScraper = require('./src/WeekendScraper.js')

const scraper = new WeekendScraper(process.argv[2])
scraper.run()
