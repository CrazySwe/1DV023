/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const getIssues = require('../models/issues')

const homeController = {}

homeController.index = async (req, res) => {
  res.render('front')
}

homeController.dashboard = async (req, res) => {
  // Show projects/repos to choose from?
  const issues = await getIssues(req.session.auth.access_token)
  console.dir(issues)
  res.render('dashboard', { issues })
}

module.exports = homeController
