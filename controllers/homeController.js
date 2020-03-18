/**
 * HomeController for fetching frontpage, projects and dashboard.
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
  const projects = await getProjects(req.session.auth.access_token)
  res.render('projects', { projects })
}

homeController.dashboard = async (req, res) => {
  req.session.chosenproject = req.params.id
  const issues = await getIssues(req.session.auth.access_token, req.params.id)
  res.render('dashboard', { issues })
}

module.exports = homeController
