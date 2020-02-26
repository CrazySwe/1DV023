/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')

const homeController = {}

homeController.index = async (req, res) => {
  const snippets = await Snippet.find().populate('author', 'username').sort([['creationDate', -1]]).exec()
  res.render('home/index', { title: 'My Snippet Application', snippets })
}

module.exports = homeController
