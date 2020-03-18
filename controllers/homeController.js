/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const getIssues = require('../models/issues')
const getProjects = require('../models/projects')

const homeController = {}

homeController.index = async (req, res) => {
  res.render('front')
}

homeController.projects = async (req, res) => {
  // Show projects/repos to choose from?

  const projects = await getProjects(req.session.auth.access_token)
  // console.dir(projects)
  res.render('projects', { projects })
}

homeController.dashboard = async (req, res) => {
  // console.dir(req.params.id)
  req.session.chosenproject = req.params.id
  const issues = await getIssues(req.session.auth.access_token, req.params.id)
  // console.dir(issues)
  res.render('dashboard', { issues })
}

module.exports = homeController
