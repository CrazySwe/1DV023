/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userRouter = require('express').Router()
const userController = require('../controllers/userController')

userRouter.route('/')
  .get(userController.index)

userRouter.route('/login')
  .get(userController.login)
  .post(userController.loginPost)

userRouter.route('/logout')
  .get(userController.logout)
// userRouter.route('/register')
//   .get(userController.register)
//   .post(userController.registerPost)

module.exports = userRouter
