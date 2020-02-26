/**
 * Router that handles the '/snippet' base path.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const snippetRouter = require('express').Router()
const snippetController = require('../controllers/snippetController')

/**
 * GET "/snippet/create".
 * POST "/snippet/create".
 */
snippetRouter.route('/create')
  .get(snippetController.create)
  .post(snippetController.createPost)

/**
 * GET "/snippet/edit/:id".
 * POST "/snippet/update".
 */
snippetRouter.get('/edit/:id', snippetController.edit)
snippetRouter.post('/update', snippetController.updatePost)

/**
 * GET "/snippet/delete/:id".
 */
snippetRouter.route('/delete/:id')
  .get(snippetController.delete)

/**
 * GET "/snippet/:id".
 */
snippetRouter.route('/:id')
  .get(snippetController.read)

module.exports = snippetRouter
