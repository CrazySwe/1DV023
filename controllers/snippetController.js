/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

snippetController.create = async (req, res) => {
  // if (!req.session.user) {
  //   return res.redirect(403, '/')
  // }
  // res.render('snippet/create', { title: 'Create New Snippet' })
}

snippetController.createPost = async (req, res) => {
  if (!req.session.user) {
    return res.redirect(403, '/')
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
  try {
    const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')
    res.render('snippet/snippet', { title: snippetData.title, snippetData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

snippetController.edit = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }
    const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')
    // console.dir(snippetData.tags)
    snippetData.tags = snippetData.tags.reduce((acc, tag) => { return acc + ', ' + tag })
    console.dir(snippetData.tags)
    res.render('snippet/edit', { title: 'Edit Snippet', snippetData })
  } catch (error) {
    console.error(error)
  }
}

snippetController.updatePost = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }

    // Update incoming snippet.
  } catch (error) {
    console.error(error)
  }
}

snippetController.delete = async (req, res) => {
  // delete the snippet and show flash message
}

module.exports = snippetController
