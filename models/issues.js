/**
 * Fetching the issues from the gitlab instance.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'
const Gitlab = require('gitlab').Gitlab

const issues = async function (oaToken, pId) {
  try {
    const api = new Gitlab({
      host: 'https://' + process.env.GITLAB_HOST,
      oauthToken: oaToken
    })
    return await api.Issues.all({ projectId: pId })
  } catch (error) {
    console.dir(error)
  }
}

module.exports = issues
