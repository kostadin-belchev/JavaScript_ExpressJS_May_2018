const mongoose = require('mongoose')

let meme = new mongoose.Schema({
  memeTitle: {type: mongoose.SchemaTypes.String, required: true},
  memePath: {type: mongoose.SchemaTypes.String, required: true},
  dateOfCreation: {type: mongoose.SchemaTypes.Date, default: Date.now},
  description: {type: mongoose.SchemaTypes.String},
  genre: {type: mongoose.SchemaTypes.String, required: true}

})

module.exports = mongoose.model('Meme', meme)
