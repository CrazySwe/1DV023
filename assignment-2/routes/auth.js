/**
 * Authentication middleware.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const createError = require('http-errors')

module.exports = function (req, res, next) {
  if (!req.session.user) {
    return next(createError(403, 'You don\t have access to this page.'))
  }
  next()
}
