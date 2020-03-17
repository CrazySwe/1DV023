/**
 * Exam Assignment 3 in course 1DV023.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const axios = require('axios')

const usersController = {}

usersController.gitlabAuth = async (req, res) => {
  // Fix temporary state to save in session.
  const state = 'tempstate'
  res.redirect(`https://${process.env.GITLAB_HOST}/oauth/authorize?` +
    `client_id=${process.env.GITLAB_APPID}&` +
    `redirect_uri=${process.env.GITLAB_REDIRECT}&` +
    'response_type=code&' +
    `state=${state}&` +
    'scope=api'
  )
}
usersController.gitlabCallback = async (req, res) => {
  // Check temporary session.state towards req.query.state
  // console.dir(req.query)
  try {
    const result = await axios({
      method: 'POST',
      url: `https://${process.env.GITLAB_HOST}/oauth/token?` +
      `client_id=${process.env.GITLAB_APPID}&` +
      `client_secret=${process.env.GITLAB_SECRET}&` +
      `code=${req.query.code}&` +
      'grant_type=authorization_code&' +
      `redirect_uri=${process.env.GITLAB_REDIRECT}`
    })
    // set session with access token etc..
    // console.dir(result.data)
    req.session.auth = result.data
  } catch (error) {
    // Clean up error more?
    return res.status(500).send('Something went wrong in getting access token...')
  }
  res.redirect('/projects')
}

module.exports = usersController
