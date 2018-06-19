const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let editSchema = new mongoose.Schema({
  articleId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Article' },
  author: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  creationDate: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
  content: { type: String, required: REQUIRED_VALIDATION_MESSAGE }
})

let Edit = mongoose.model('Edit', editSchema)

module.exports = Edit
