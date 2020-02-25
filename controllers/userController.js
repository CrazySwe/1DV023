/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userController = {}

userController.index = async (req, res) => {
  res.send('This is the index function of user. What should be we be able to do here?')
}

userController.login = async (req, res) => {
  // Check if already logged in?
  if (req.session.username !== undefined) {
    res.redirect('/')
  } else {
    res.render('user/login', { title: 'Login Page' })
  }
}

userController.loginPost = async (req, res) => {
  try {
    // TODO Lets try to login
    req.session.user = req.body.username
    // req.session.password = req.body.password
    req.session.flash = { type: 'success', text: 'You logged in! Welcome!' }
    res.redirect('/')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

userController.logout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

module.exports = userController
