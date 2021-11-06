/**
 * HomeController for fetching frontpage, projects and dashboard.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const getIssues = require('../models/issues')
const getProjects = require('../models/projects')
const gitlabhook = require('../middleware/gitlabhook')

const homeController = {}

homeController.index = async (req, res) => {
  res.render('front')
}

homeController.projects = async (req, res) => {
  const projects = await getProjects(req.session.auth.access_token)
  res.render('projects', { projects })
}

homeController.dashboard = async (req, res, next) => {
  try {
    const issues = await getIssues(req.session.auth.access_token, req.params.id)
    const webhooksecret = await gitlabhook.createHash(req.params.id)
    req.session.chosenproject = req.params.id
    res.render('dashboard', { issues, webhooksecret })
  } catch (err) {
    next(new Error(err))
  }
}

module.exports = homeController
