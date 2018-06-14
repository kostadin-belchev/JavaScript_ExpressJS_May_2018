// in order to search in a MongoDB we need models
const mongoose = require('mongoose')

let memeSchema = new mongoose.Schema({
  memeTitle: { type: mongoose.SchemaTypes.String, required: true },
  memePath: { type: mongoose.SchemaTypes.String, required: true },
  dateOfCreation: { type: mongoose.SchemaTypes.Date, default: Date.now },
  memeDescription: { type: mongoose.SchemaTypes.String },
  genre: { type: mongoose.SchemaTypes.String, required: true }
})

module.exports = mongoose.model('Meme', memeSchema)
