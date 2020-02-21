/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userRouter = require('express').Router()
const userController = require('../controllers/userController')

userRouter.route('/')
  .get(userController.index)

// userRouter.route('/register')
//   .get()

module.exports = userRouter
