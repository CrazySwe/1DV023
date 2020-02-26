/**
 * Mongoose model for a Snippet.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String },
  creationDate: { type: Date, default: Date.now },
  tags: [String]
})

const snippet = mongoose.model('Snippet', snippetSchema)

module.exports = snippet
