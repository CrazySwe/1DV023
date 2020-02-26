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
  try {
    if (!req.session.user) {
      return res.redirect(403, '/')
    }

    const snippetData = await Snippet.findById(req.params.id).populate('author', 'username')

    if (snippetData.author.id === req.session.user.id) {
      snippetData.tags = snippetData.tags.reduce((acc, tag) => { return acc + ', ' + tag })
      return res.render('snippet/edit', { title: 'Edit Snippet', snippetData })
    } else {
      req.session.flash = { type: 'danger', text: 'You don\'t own that snippet.' }
      res.redirect('/user')
    }
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

snippetController.updatePost = async (req, res) => {
  if (!req.session.user) {
    return res.redirect(403, '/')
  }
  try {
    const result = await Snippet.updateOne({ _id: req.body.id, author: req.session.user.id }, {
      title: req.body.title,
      body: req.body.snippetbody,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    }).exec()

    if (result.nModified === 1) {
      req.session.flash = { type: 'success', text: 'Your snippet was updated successfully.' }
    } else {
      req.session.flash = { type: 'danger', text: 'Something went wrong updating the snippet.' }
    }

    res.redirect('/user')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

snippetController.delete = async (req, res) => {
  if (!req.session.user) {
    return res.redirect(403, '/')
  }
  try {
    const result = await Snippet.deleteOne({ _id: req.params.id, author: req.session.user.id })

    if (result.n === 1) {
      req.session.flash = { type: 'success', text: 'Snippet deleted successfully.' }
    } else {
      req.session.flash = { type: 'danger', text: 'Something went wrong when deleting the snippet.' }
    }
    res.redirect('/user')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

module.exports = snippetController
