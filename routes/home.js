/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const homeRouter = require('express').Router()
const homeController = require('../controllers/homeController')

homeRouter.route('/')
  .get(homeController.index)
  .post(homeController.indexPost)

module.exports = homeRouter
