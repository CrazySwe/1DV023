/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

module.exports = async function (req, res, next) {
  if (!req.session.auth) {
    return res.redirect('/')
  }
  next()
}
