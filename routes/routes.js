/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

module.exports = (app) => {
  app.use('/', require('./homeRoutes'))
  app.use('/users', require('./usersRoutes'))
}
