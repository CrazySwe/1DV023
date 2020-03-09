/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const homeController = {}

homeController.index = async (req, res) => {
  res.status(200).send('This is the frontpage.')
}

module.exports = homeController
