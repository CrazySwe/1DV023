/**
 * Web scraper for URLs.
 *
 * @module lib/myscraper.js
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const request = require('request')

const extractLinks = async urls => {
  const promises = urls.map(async url => getHTML(url))

  const result = await Promise.all(promises)
  console.log(result)

  // console.dir(testreq)
  return ['link1', 'link2']
}

/**
 * GetHTML - Gets the body of a website.
 *
 * @param {string} url - The url.
 * @returns {Promise<?>} - A promise.
 */
const getHTML = async url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error)
      resolve(body)
    })
  })
}

module.exports.extractLinks = extractLinks
