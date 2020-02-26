/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const snippetRouter = require('express').Router()
const snippetController = require('../controllers/snippetController')

snippetRouter.route('/create')
  .get(snippetController.create)
  .post(snippetController.createPost)

snippetRouter.get('/edit/:id', snippetController.edit)
snippetRouter.post('/update', snippetController.updatePost)

snippetRouter.route('/delete/:id')
  .get(snippetController.delete)

snippetRouter.route('/:id')
  .get(snippetController.read)

module.exports = snippetRouter
