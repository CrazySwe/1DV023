/**
 * Fetching the issues from the gitlab instance.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'
const Gitlab = require('gitlab').Gitlab

/**
 * Function that fetches the issues from a specific project.
 *
 * @param {string} oaToken - The Oauth token string.
 * @param {string} pId  - The project ID.
 * @throws {Error} - Error if fetching issues goes wrong.
 */
const issues = async function (oaToken, pId) {
  const api = new Gitlab({
    host: 'https://' + process.env.GITLAB_HOST,
    oauthToken: oaToken
  })
  return api.Issues.all({ projectId: pId })
}

module.exports = issues
