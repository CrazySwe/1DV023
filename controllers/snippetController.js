/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const SnippetModel = require('../models/snippet')

const snippetController = {}

snippetController.create = async (req, res) => {
  // TODO only users
  res.render('snippet/create', { title: 'Create New Snippet' })
}

snippetController.createPost = async (req, res) => {
  // TODO only users
  try {
    const snippet = new SnippetModel({
      title: req.body.title,
      author: req.session.user.id,
      body: req.body.snippetbody,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    })

    await snippet.save()
  } catch (error) {
    console.error(error)
  }
  req.session.flash = { type: 'success', text: 'Snippet created successfully!' }
  res.redirect('/snippet/create')
}

snippetController.read = async (req, res) => {
// Show the snippet PUBLIC
}

snippetController.update = async (req, res) => {
// Show snippet to update and send post form
}

snippetController.updatePost = async (req, res) => {
  // update snippet and show flash message
}

snippetController.delete = async (req, res) => {
  // delete the snippet and show flash message
}

module.exports = snippetController
