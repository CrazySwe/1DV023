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
  res.redirect(`https://${process.env.GL_URI}/oauth/authorize?` +
    `client_id=${process.env.GL_APPID}&` +
    `redirect_uri=${process.env.GL_REDIRECT}&` +
    'response_type=code&' +
    `state=${state}&` +
    'scope=api'
  )
}
usersController.gitlabCallback = async (req, res) => {
  // Check temporary session.state towards req.query.state
  console.dir(req.query)
  try {
    const result = await axios({
      method: 'POST',
      url: `https://${process.env.GL_URI}/oauth/token?` +
      `client_id=${process.env.GL_APPID}&` +
      `client_secret=${process.env.GL_SECRET}&` +
      `code=${req.query.code}&` +
      'grant_type=authorization_code&' +
      `redirect_uri=${process.env.GL_REDIRECT}`
    })
    console.dir(result.data)
  } catch (error) {
    console.dir(error)
    return res.status(500).send('Something went wrong in getting access token...')
  }
  res.status(200).send('it worked? Success gitlabCallback')
}

module.exports = usersController
