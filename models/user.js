/**
 * Mongoose model for a user.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 8
  }
})

const user = mongoose.model('User', userSchema)

module.exports = user
