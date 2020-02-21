/**
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const userController = {}

userController.index = (req, res) => {
  res.send('This is the index function.')
}

module.exports = userController
