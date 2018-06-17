const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({
  title: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  isLocked: { type: Boolean, required: true, default: false },
  edits: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Edit' }]
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
