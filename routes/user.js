/**
 * Router that handles the '/user' base path.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userRouter = require('express').Router()
const userController = require('../controllers/userController')

/**
 * GET "/user/".
 */
userRouter.route('/')
  .get(userController.index)

/**
 * GET "/user/login".
 * POST "/user/login".
 */
userRouter.route('/login')
  .get(userController.login)
  .post(userController.loginPost)

/**
 * GET "/user/logout".
 */
userRouter.route('/logout')
  .get(userController.logout)

/**
 * GET "/user/register".
 * POST "/user/register".
 */
userRouter.route('/register')
  .get(userController.register)
  .post(userController.registerPost)

module.exports = userRouter
