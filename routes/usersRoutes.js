/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const usersRouter = require('express').Router()
const usersController = require('../controllers/usersController')

usersRouter.route('/auth')
  .get(usersController.auth)

module.exports = usersRouter
