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
    required: [true, 'Username cannot be blank.'],
    minlength: [2, 'Username must be at least 2 characters long.'],
    maxlength: [25, 'Username must be less than 26 characters long.'],
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: async function (value) {
        return !await this.model('User').findOne({ username: value }).exec()
      },
      message: 'That username is already taken.'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
    validate: {
      validator: (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&åÅäÄöÖ]{8,}$/m.test(v),
      message: 'The password must contain upper and lower case character and inlude at least one number and symbol.'
    }
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
