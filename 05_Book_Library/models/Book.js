// in order to search in a MongoDB we need models
const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
  bookTitle: { type: mongoose.SchemaTypes.String, required: true },
  bookYear: { type: mongoose.SchemaTypes.String, required: true },
  bookPoster: { type: mongoose.SchemaTypes.String, required: true },
  bookAuthor: { type: mongoose.SchemaTypes.String, required: true }
})

module.exports = mongoose.model('Book', bookSchema)
