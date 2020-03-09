/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const usersController = {}

usersController.auth = async (req, res) => {
  res.send('Authcontroller.')
}

module.exports = usersController
