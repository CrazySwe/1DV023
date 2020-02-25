/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const moment = require('moment')

const homeController = {}

homeController.index = (req, res) => {
  res.render('home/index', { title: 'MySnippetApplication' })
}

homeController.indexPost = (req, res) => {
  const viewData = {
    name: req.body.name,
    dayName: moment().format('dddd')
  }

  res.render('home/index', { title: 'indexPost', viewData })
}

module.exports = homeController
