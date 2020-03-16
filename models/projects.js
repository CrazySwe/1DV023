/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'
const Gitlab = require('gitlab').Gitlab

const projects = async function (oaToken) {
  try {
    const api = new Gitlab({
      host: 'https://' + process.env.GITLAB_HOST,
      oauthToken: oaToken
    })

    // Fix this maybe?
    return await api.Projects.all({
      membership: true
    })
  } catch (error) {
    // CLEAN UP ERRORS?!
    console.dir(error)
  }
}

module.exports = projects
