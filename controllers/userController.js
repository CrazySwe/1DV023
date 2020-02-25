/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userController = {}

userController.index = (req, res) => {
  res.send('This is the index function of user. What should be we be able to do here?')
}

userController.login = (req, res) => {
  // Check if already logged in?
  if (req.session.username !== undefined) {
    res.redirect('/')
  } else {
    res.render('user/login', { header: 'Login Page' })
  }
}

userController.loginPost = (req, res) => {
  try {
    // lets try to login
    req.session.username = req.body.username
    req.session.password = req.body.password
    console.log(req.body.username)
    console.log(req.body.password)
    res.redirect('/')
  } catch (error) {
    // Show error message while logging in? "flash"?
  }
}

module.exports = userController
