/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

snippetController.create = async (req, res) => {
  if (!req.session.user) {
    return res.redirect(403, '/')
  }
  try {
    res.render('snippet/create', { title: 'Create New Snippet' })
  } catch (error) {
    console.error(error)
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
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
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
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
  // TODO: Only the right user can start editing.
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }
    const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')
    snippetData.tags = snippetData.tags.reduce((acc, tag) => { return acc + ', ' + tag })
    res.render('snippet/edit', { title: 'Edit Snippet', snippetData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

snippetController.updatePost = async (req, res) => {
  // TODO: Check it's the right user updating.
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }
    const result = await Snippet.updateOne({ _id: req.body.id }, {
      title: req.body.title,
      body: req.body.snippetbody,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    }).exec()

    console.dir(result)

    req.session.flash = { type: 'success', text: 'Your snippet was updated successfully.' }
    res.redirect('/user')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

snippetController.delete = async (req, res) => {
  // TODO: Check its the right user that can delete.
  // delete the snippet and show flash message
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }
    await Snippet.deleteOne({ _id: req.params.id })

    req.session.flash = { type: 'success', text: 'Snippet deleted successfully.' }
    res.redirect('/user')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

module.exports = snippetController
