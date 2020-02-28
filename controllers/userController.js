/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const User = require('../models/user')
const Snippet = require('../models/snippet')

const userController = {}

/**
 * The start page for the logged in user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
userController.index = async (req, res) => {
  if (!req.session.user) {
    return res.redirect(403, '/user/login')
  }
  try {
    const snippets = await Snippet.find({ author: req.session.user.id }).sort([['creationDate', -1]]).exec()
    res.render('user/index', { title: 'My Snippets', snippets })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.render('user/index', { title: 'My Snippets' })
  }
}

/**
 * Presents the login page.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
userController.login = async (req, res) => {
  if (req.session.user !== undefined) {
    res.redirect(403, '/')
  } else {
    res.render('user/login', { title: 'Login Page' })
  }
}

/**
 * Handles the login of a user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
userController.loginPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec()

    if (!user || !user.isPasswordMatch(req.body.password)) {
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

/**
 * Handles the logout of a user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
userController.logout = async (req, res) => {
  req.session.destroy()

  res.redirect('/')
}

/**
 * Presents the registration page.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
userController.register = async (req, res) => {
  res.render('user/register', { title: 'Register Form' })
}

/**
 * Registers a new user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
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
    if (error.errors.username) {
      req.session.flash.push({ type: 'danger', text: error.errors.username.message })
    }
    if (error.errors.password) {
      req.session.flash.push({ type: 'danger', text: error.errors.password.message })
    }
    // Gotta fix this.
    // req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/user/register')
  }
}

module.exports = userController
