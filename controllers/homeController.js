/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')

const homeController = {}

homeController.index = async (req, res) => {
  const snippets = await Snippet.find().populate('author', 'username').sort('creationDate').limit(20).exec()
  res.render('home/index', { title: 'My Snippet Application', snippets })
}

homeController.indexPost = async (req, res) => {
  res.render('home/index', { title: 'index Post' })
}

module.exports = homeController
