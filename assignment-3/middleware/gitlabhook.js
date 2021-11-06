/**
 * Verifies GitLab webhooks.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const crypto = require('crypto')

const gitlabhookverify = {}

/**
 * Creates a hash from a string.
 *
 * @param {string} projectId - The string to include in the hash.
 */
gitlabhookverify.createHash = async function (projectId) {
  const hmac = crypto.createHmac('sha1', process.env.GITLAB_WEBHOOK_KEY)
  const secret = hmac.update(projectId).digest('hex')
  return secret
}

/**
 * Compares 2 hashes and returns if they are equal.
 *
 * @param {string} tokenA - The hash to compare with tokenB.
 * @param {string} tokenB - The hash to compare with tokenA.
 */
gitlabhookverify.compareHash = async function (tokenA, tokenB) {
  const source = Buffer.from(tokenA)
  const comparison = Buffer.from(tokenB)
  return crypto.timingSafeEqual(source, comparison)
}

/**
 * Middleware that verifies the incoming requests gitlab token.
 *
 * @param {object} req - The request object.
 * @param {object} res - The request object.
 * @param {object} next - The next middleware callback.
 */
gitlabhookverify.verify = async function (req, res, next) {
  const tokenA = req.get('X-Gitlab-Token')
  const tokenB = await gitlabhookverify.createHash(req.body.project.id.toString())
  try {
    if (await gitlabhookverify.compareHash(tokenA, tokenB)) {
      next()
    } else {
      // Else something is wrong? Bad request?
      res.sendStatus(400)
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

module.exports = gitlabhookverify
