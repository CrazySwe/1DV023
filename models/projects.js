/**
 * Fetching the projects from the gitlab instance.
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
    return await api.Projects.all({
      membership: true
    })
  } catch (error) {
    console.dir(error)
  }
}

module.exports = projects
