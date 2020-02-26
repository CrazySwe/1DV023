/**
 * Base router for root path.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const homeRouter = require('express').Router()
const homeController = require('../controllers/homeController')

/**
 * GET "/".
 */
homeRouter.route('/')
  .get(homeController.index)

module.exports = homeRouter
