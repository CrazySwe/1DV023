/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

module.exports = (app) => {
  app.use('/', require('./home'))
  app.use('/user', require('./user'))
  app.use('/snippet', require('./snippet'))
}
