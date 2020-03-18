/**
 * Webhook Routes.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const webhookRouter = require('express').Router()
const webhookController = require('../controllers/webhookController')

webhookRouter.route('/')
  .post(webhookController.indexPost)

module.exports = webhookRouter
