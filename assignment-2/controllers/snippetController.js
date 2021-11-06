/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')
const moment = require('moment')

const snippetController = {}

/**
 * Handles the create snippet page.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.create = async (req, res) => {
  try {
    res.render('snippet/create', { title: 'Create New Snippet' })
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
}

/**
 * Creates a snippet and saves it to database.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.createPost = async (req, res) => {
  try {
    const snippet = new Snippet({
      title: req.body.title,
      author: req.session.user.id,
      body: req.body.snippetbody,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    })

    await snippet.save()
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
  req.session.flash.push({ type: 'success', text: 'Snippet created successfully!' })
  res.redirect('/snippet/create')
}

/**
 * Gets a specific snippet and present it.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.read = async (req, res) => {
  try {
    const data = await Snippet.findById(req.params.id).populate('author', 'username')
    const snippetData = {
      title: data.title,
      author: data.author.username.charAt(0).toUpperCase() + data.author.username.substring(1),
      creationDate: moment(data.creationDate).format('LLL'),
      tags: data.tags,
      body: data.body
    }
    res.render('snippet/snippet', { title: snippetData.title, snippetData })
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
}

/**
 * Presents an editing page for a specific snippet.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.edit = async (req, res) => {
  try {
    const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')

    if (snippetData.author.id === req.session.user.id) {
      snippetData.tags = snippetData.tags.reduce((acc, tag) => { return acc + ', ' + tag })
      return res.render('snippet/edit', { title: 'Edit Snippet', snippetData })
    } else {
      req.session.flash.push({ type: 'danger', text: 'You don\'t own that snippet.' })
      res.redirect('/user')
    }
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
}

/**
 * Updates a snippet in the database.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.updatePost = async (req, res) => {
  try {
    const result = await Snippet.updateOne({ _id: req.body.id, author: req.session.user.id }, {
      title: req.body.title,
      body: req.body.snippetbody,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    }).exec()

    if (result.nModified === 1) {
      req.session.flash.push({ type: 'success', text: 'Your snippet was updated successfully.' })
    } else {
      req.session.flash.push({ type: 'danger', text: 'Something went wrong updating the snippet.' })
    }

    res.redirect('/user')
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
}

/**
 * Deletes a specific snippet in the database.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
snippetController.delete = async (req, res) => {
  try {
    const result = await Snippet.deleteOne({ _id: req.params.id, author: req.session.user.id })

    if (result.n === 1) {
      req.session.flash.push({ type: 'success', text: 'Snippet deleted successfully.' })
    } else {
      req.session.flash.push({ type: 'danger', text: 'Something went wrong when deleting the snippet.' })
    }
    res.redirect('/user')
  } catch (error) {
    req.session.flash.push({ type: 'danger', text: error.message })
    res.redirect('/')
  }
}

module.exports = snippetController
