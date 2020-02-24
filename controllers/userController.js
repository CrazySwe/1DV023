/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userController = {}

userController.index = (req, res) => {
  res.send('This is the index function.')
}

userController.login = (req, res) => {
  res.render('user/login')
}

userController.loginPost = (req, res, next) => {
  try {
    // lets try to login
  } catch (error) {
    // Show error message while logging in? "flash"?
  }

  next()
}

module.exports = userController
