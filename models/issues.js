/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'
const Gitlab = require('gitlab').Gitlab

const issues = async function (oaToken, id) {
  try {
    const api = new Gitlab({
      host: 'https://' + process.env.GITLAB_HOST,
      oauthToken: oaToken
    })

    // Fix this maybe?
    return await api.Issues.all(id)
  } catch (error) {
    // CLEAN UP ERRORS?!
    console.dir(error)
  }
}

module.exports = issues
