/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const homeController = {}

homeController.index = async (req, res) => {
  res.render('front')
}

module.exports = homeController
