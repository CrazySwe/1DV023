/**
 * Mongoose model for Snippet.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  body: { type: String },
  creationDate: { type: Date, default: Date.now },
  tags: [String]
})

const snippet = mongoose.model('snippet', snippetSchema)

module.exports = snippet
