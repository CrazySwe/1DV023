/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const moment = require('moment')

const homeController = {}

homeController.index = async (req, res) => {
  res.render('home/index', { title: 'MySnippetApplication' })
}

homeController.indexPost = async (req, res) => {
  const viewData = {
    name: req.body.name,
    dayName: moment().format('dddd')
  }

  res.render('home/index', { title: 'indexPost', viewData })
}

module.exports = homeController
