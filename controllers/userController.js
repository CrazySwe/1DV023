/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const User = require('../models/user')

const userController = {}

userController.index = async (req, res) => {
  res.send('This is the index function of user. What should be we be able to do here?')
}

userController.login = async (req, res) => {
  if (req.session.user !== undefined) {
    res.redirect('/')
  } else {
    res.render('user/login', { title: 'Login Page' })
  }
}

userController.loginPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user || user.password !== req.body.password) {
      req.session.flash = { type: 'danger', text: 'Wrong username or password.' }
      return res.redirect('/user/login')
    }

    req.session.user = { username: user.username, id: user._id }
    req.session.flash = { type: 'success', text: 'You are logged in! Welcome!' }
    res.redirect('/')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/user/login')
  }
}

userController.logout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

userController.register = async (req, res) => {
  res.render('user/register', { title: 'Register Form' })
}

userController.registerPost = async (req, res) => {
  try {
    if (req.body.password === req.body.passwordrepeat) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      })

      await newUser.save()

      req.session.flash = { type: 'success', text: 'Your account was created successfully.' }
      res.redirect('/user/login')
    } else {
      req.session.flash = { type: 'danger', text: 'The passwords do not match.' }
      res.redirect('/user/register')
    }
  } catch (error) {
    console.error(error)
    // TODO: Maybe clean up this error message more pretty?
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/user/register')
  }
}

module.exports = userController
