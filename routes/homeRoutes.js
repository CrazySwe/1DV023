/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const homeRouter = require('express').Router()
const homeController = require('../controllers/homeController')
const isAuth = require('../middleware/auth')

homeRouter.route('/')
  .get(homeController.index)

homeRouter.route('/dashboard')
  .get(isAuth, homeController.dashboard)

module.exports = homeRouter
