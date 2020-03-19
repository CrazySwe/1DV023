/**
 * Webhook Routes.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const webhookRouter = require('express').Router()
const webhookController = require('../controllers/webhookController')
const webhookVerifier = require('../middleware/gitlabhook')

/**
 * POST /webhook/.
 */
webhookRouter.route('/')
  .post(webhookVerifier.verify, webhookController.indexPost)

module.exports = webhookRouter
