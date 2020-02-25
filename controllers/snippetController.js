/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

snippetController.create = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/')
  }
  res.render('snippet/create', { title: 'Create New Snippet' })
}

snippetController.createPost = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/')
  }
  try {
    const snippet = new Snippet({
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
  const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')
  console.dir(snippetData)
  res.render('snippet/snippet', { title: snippetData.title, snippetData })
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
