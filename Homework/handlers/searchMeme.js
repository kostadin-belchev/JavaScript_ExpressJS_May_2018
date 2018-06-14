const Genre = require('../models/GenreSchema')

module.exports = (req, res) => {
  Genre.find({}).then((genres) => {
    res.render('searchMeme', {genres})
  })
}
