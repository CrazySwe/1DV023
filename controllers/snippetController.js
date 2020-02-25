/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const SnippetModel = require('../models/snippet')

const snippetController = {}

snippetController.create = (req, res) => {
  res.render('snippet/create', { title: 'Create New Snippet' })
}

snippetController.createPost = async (req, res) => {
  try {
    const snippet = new SnippetModel({
      title: 'testTitle',
      author: 'username',
      body: req.body.snippetbody,
      tags: ['test', 'what']
    })

    await snippet.save()

    res.redirect('/snippet/create')
  } catch (error) {
    console.error(error)
    res.redirect('/snippet/create')
  }
}

module.exports = snippetController
