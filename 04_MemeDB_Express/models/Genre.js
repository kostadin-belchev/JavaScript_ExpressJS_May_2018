// in order to search in a MongoDB I need models
const mongoose = require('mongoose')

let genreSchema = new mongoose.Schema({
  genreTitle: { type: mongoose.SchemaTypes.String, required: true },
  memeList: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Meme' }]
})

module.exports = mongoose.model('Genre', genreSchema)
