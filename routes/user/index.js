/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userRouter = require('express').Router()

userRouter.route('/register')
  .get((req, res, next) => {
    res.send('register!')
  })

module.exports = userRouter
