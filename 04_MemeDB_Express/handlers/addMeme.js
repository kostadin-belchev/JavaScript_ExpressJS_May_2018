const Genre = require('../models/Genre')

module.exports = (req, res) => {
  Genre.find({}).then((genres) => {
    res.render('addMeme', {genres})
  })
}
