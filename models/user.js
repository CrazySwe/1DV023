/**
 * Mongoose model for a user.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

/**
 * Registers a hash function to pre hook before saving.
 *
 * Https://mongoosejs.com/docs/api.html#schema_Schema-pre.
 */
userSchema.pre('save', function (next) {
  // only re-hash during creating or updating
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  next()
})

/**
 * Compares a plaintext password with the usermodel.
 *
 * @param {string} plaintext - The string to compare with.
 * @returns {boolean} True if matching, otherwise false.
 */
userSchema.methods.isPasswordMatch = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

const user = mongoose.model('User', userSchema)

module.exports = user
