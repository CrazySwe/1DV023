/**
 * Routes for users.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const usersRouter = require('express').Router()
const usersController = require('../controllers/usersController')

/**
 * GET users/auth/gitlab/.
 */
usersRouter.route('/auth/gitlab')
  .get(usersController.gitlabAuth)

/**
 * GET users/auth/gitlab/callback.
 */
usersRouter.route('/auth/gitlab/callback')
  .get(usersController.gitlabCallback)

module.exports = usersRouter
