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

module.exports = snippetRouter
