const mongoose = require('mongoose')

let genre = new mongoose.Schema({
  genreTitle: {type: mongoose.SchemaTypes.String, required: true},
  memeList: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Meme'}]
})

module.exports = mongoose.model('Genre', genre)
