/**
 * Controller for the base Homepage.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')
const moment = require('moment')

const homeController = {}

/**
 * Handles the index page for the front page.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
homeController.index = async (req, res) => {
  const data = await Snippet.find().populate('author', 'username').sort([['creationDate', -1]]).exec()
  const snippets = data.map(model => {
    return {
      title: model.title,
      id: model.id,
      author: model.author.username,
      creationDate: moment(model.creationDate).format('LLL')
    }
  })
  res.render('home/index', { title: 'My Snippet Application', snippets })
}

module.exports = homeController
